import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import CartModel from "./../../models/Cart";
import OrderModel from "./../../models/OrderModel";
import calculateCartTotal from "./../../utils/calculateCartTotal";

const stripeKey = Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRouter = async (req, res) => {
  const {
    method,
    body: { paymentData },
    headers: { authorization }
  } = req;

  switch (method) {
    case "POST":
      try {
        // 1. Verify and get user id from token
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        // 2. Find cart based on user id, populate it
        const cart = await CartModel.findOne({ user: userId }).populate({
          path: "products.product",
          model: "Product"
        });
        // 3. Recalculate cart totals (security)
        const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
        // 4. Get email from paymentData, see if linked to existing Stripe customer
        const stripeEmailExists = await stripe.customers.list({
          email: paymentData.email,
          limit: 1
        });
        const isExistingCustomer = stripeEmailExists.data.length > 0;
        // 5. If no exists, create a new Stripe customer
        let newStripeCustomer;
        if (!stripeEmailExists) {
          newStripeCustomer = await stripe.customers.create({
            email: paymentData.email,
            source: paymentData.id,
            receipt_email: paymentData.email,
            customer: cus
          });
        }
        //
        const customerId =
          (isExistingCustomer && stripeEmailExists[0].id) ||
          newStripeCusomter.id;

        // Create new charge with total, send receipt email
        const newCharge = await stripe.charges.create(
          {
            currency: "usd",
            amount: stripeTotal,
            customer: customerId,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
          },
          {
            // To prevent the same charge from happening
            idempotency_key: uuidv4()
          }
        );

        // Create new Order and save to DB
        await new OrderModel({
          user: userId,
          products: cart.products,
          email: paymentData.email,
          total: cartTotal
        }).save();

        // Clear products from cart
        await CartModel.findOneAndUpdate(
          {
            _id: cart._id
          },
          { $set: { products: [] } }
        );

        return res.status(200).send("Checkout successful!");
      } catch (err) {
        return res.status(500).send(`Server error at POST: ${err}`);
      }
    default:
      return res.status(405).send("Server error! Method not allowed.");
  }
};

export default checkoutRouter;

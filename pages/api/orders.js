import jwt from "jsonwebtoken";
import { connectDB } from "./../../utils/connectDB";
import OrderModel from "./../../models/Order";

const ordersRouter = async (req, res) => {
  const {
    method,
    headers: { authorization }
  } = req;

  switch (method) {
    case "GET":
      try {
        // Get userId from token
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        // Get orders from model
        const orders = await OrderModel.find({ user: userId })
          .sort({
            createdAt: "desc"
          })
          .populate({
            path: "products.product",
            model: "Product"
          });

        return res.status(200).json({ orders });
      } catch (err) {
        return res
          .status(500)
          .send(`Server Error in the orders route! ${err.message}`);
      }
    default:
      return res.status(405).json({ msg: `Method ${method} not allowed!` });
  }
};

export default ordersRouter;

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import CartModel from "./../../models/Cart";
import connectDB from "../../utils/connectDB";

const { ObjectId } = mongoose.Types;

const cartRouter = async (req, res) => {
  const {
    method,
    body: { quantity, productId },
    headers: { authorization },
    query: { cartProductId }
  } = req;

  switch (method) {
    case "GET":
      try {
        // Check if authToken is present
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const cart = await CartModel.findOne({ user: userId }).populate({
          path: "products.product",
          model: "Product"
        });

        return res.status(200).json(cart.products);
      } catch (error) {
        return res.status(403).send(`Server error! ${error}`);
      }
      break;
    case "PUT":
      try {
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }
        // Verify token to get userId
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

        // Get user cart based on userId
        const cart = await CartModel.findOne({ user: userId });

        // Check if product already exists in cart
        const productExistsInCart = cart.products.some(document =>
          ObjectId(productId).equals(document.product)
        );

        if (productExistsInCart) {
          // Increment quantity of given product
          await CartModel.findOneAndUpdate(
            { _id: cart._id, "products.product": productId },
            { $inc: { "products.$.quantity": quantity } }
          );
        } else {
          // Create new product in cart
          const newProduct = { product: productId, quantity };
          await CartModel.findOneAndUpdate(
            { _id: cart._id },
            { $addToSet: { products: newProduct } }
          );
        }
        return res.status(200).send("Cart updated!");
      } catch (err) {
        return res.status(403).send(`Server error! ${err}`);
      }
      break;
    case "DELETE":
      try {
        // Check if authToken is present
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: userId },
          {
            $pull: { products: { product: cartProductId } }
          },
          {
            new: true
          }
        ).populate({
          path: "products.product",
          model: "Product"
        });
        return res.status(200).json(updatedCart.products);
      } catch (error) {
        return res.status(403).send(`Server error! ${error}`);
      }
      break;
    default:
      return res.status(405).send("Server Error!");
  }
};

export default cartRouter;

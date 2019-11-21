import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import CartModel from "./../../models/Cart";
import connectDB from "../../utils/connectDB";

const cartRouter = async (req, res) => {
  const {
    method,
    body: { quantity, productId },
    headers: { authorization }
  } = req;

  switch (method) {
    case "GET":
      try {
        // Check if authToken is present
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const cart = await CartModel.findOne({ user: userId });
        const populatedCart = await cart.populate({
          path: "products.product",
          model: "Product"
        });
        return res.status(200).json(populatedCart.products);
      } catch (error) {
        return res.status(403).send(`Server error! ${error}`);
      }
    case "PUT":
      try {
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }
        // Verify token to get userId
        const { userId } = jwt.verify(authorization, process.env.JWT_TOKEN);

        // Get user cart based on userId

        // 


        return res.status(200).json();
      } catch (err) {
        return res.status(403).send(`Server error! ${err}`);
      }
    default:
      return res.status(405).send("Server Error!");
  }
};

export default cartRouter;

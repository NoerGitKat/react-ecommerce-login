import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: Types.ObjectId,
        ref: "Product"
      }
    }
  ]
});

const CartModel = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default CartModel;

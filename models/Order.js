import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
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
    ],
    email: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;

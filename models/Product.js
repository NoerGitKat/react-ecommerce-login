import mongoose from "mongoose";
import shortid from "shortid";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

// Create model in DB if it doesn't exist
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;

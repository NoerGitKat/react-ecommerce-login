import mongoose from 'mongoose';
import shortid from 'shortid';

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

const ProductModel =
  mongoose.models.product || mongoose.model('product', ProductSchema);

export default ProductModel;

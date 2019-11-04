import ProductModel from './../../models/Product';
import connectDB from './../../utils/connectDB';

connectDB();

const productRouter = async (req, res) => {
  const allProducts = await ProductModel.find();

  switch (req.method) {
    case 'GET':
      return res.status(200).json(allProducts);
    default:
      return res.status(500).json({ msg: 'this is default' });
  }
};

export default productRouter;

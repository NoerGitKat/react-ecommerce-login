import ProductModel from './../../models/Product';
import connectDB from './../../utils/connectDB';

connectDB();

const productsRouter = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();

    switch (req.method) {
      case 'GET':
        return res.status(200).json(allProducts);
      default:
        return res.status(500).json({ msg: 'this is default' });
    }
  } catch (err) {
    return res.status(500).json({ msg: ' Server Error!' });
  }
};

export default productsRouter;

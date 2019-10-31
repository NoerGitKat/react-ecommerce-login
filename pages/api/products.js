import products from './../../static/products.json';
import connectDB from './../../utils/connectDB';

connectDB();

const productRouter = (req, res) => {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(products);
    default:
      return res.status(500).json({ msg: 'this is default' });
  }
};

export default productRouter;

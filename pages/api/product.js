import ProductModel from './../../models/Product';

const productRouter = async (req, res) => {
  try {
    const { method } = req;
    const { _id } = req.query;

    switch (method) {
      case 'GET':
        const singleProduct = await ProductModel.findById(_id);
        return res.status(200).json(singleProduct);
      case 'DELETE':
        await ProductModel.findOneAndDelete({ _id });
        return res.status(204).json({});
      default:
        return res.status(405).json({ msg: `Method ${method} not allowed!` });
    }
  } catch (err) {
    return res.status(500).json({ msg: `Server Error! ${err.message}` });
  }
};

export default productRouter;

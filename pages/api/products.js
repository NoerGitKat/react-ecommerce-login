import ProductModel from "./../../models/Product";
import connectDB from "./../../utils/connectDB";

connectDB();

const productsRouter = async (req, res) => {
  const {
    query: { page, size }
  } = req;

  const pageNum = Number(page);
  const pageSize = Math.ceil(Number(size));

  try {
    let products = [];
    const totalDocs = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      products = await ProductModel.find().limit(pageSize);
    } else {
      const skippedProducts = pageSize * (pageNum - 1);
      products = await ProductModel.find()
        .skip(skippedProducts)
        .limit(pageSize);
    }

    switch (req.method) {
      case "GET":
        return res.status(200).json({ products, totalPages });
      default:
        return res.status(500).send("this is default");
    }
  } catch (err) {
    return res.status(500).send(" Server Error!");
  }
};

export default productsRouter;

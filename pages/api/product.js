import ProductModel from "./../../models/Product";
import connectDb from "../../utils/connectDB";

const productRouter = async (req, res) => {
  try {
    const {
      method,
      query: { _id },
      body: { name, price, description, mediaUrl }
    } = req;

    // Make sure there's a DB connection
    connectDb();

    switch (method) {
      case "GET":
        const singleProduct = await ProductModel.findById(_id);
        return res.status(200).json(singleProduct);
      case "POST":
        // Make sure user filled out all fields
        if (!name || !price || !description || !mediaUrl) {
          return res.status(422).send("Product missing one or more fields!");
        } else {
          const newProduct = new ProductModel({
            name,
            price,
            description,
            mediaUrl
          });
          await newProduct.save();
          return res.status(201).json(newProduct);
        }
      case "DELETE":
        await ProductModel.findOneAndDelete({ _id });
        return res.status(204).json({ msg: "Product deleted!" });
      default:
        return res.status(405).json({ msg: `Method ${method} not allowed!` });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(`Server Error in the product route! ${err.message}`);
  }
};

export default productRouter;

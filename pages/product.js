import axios from "axios";
import ProductSummary from "./../components/Product/ProductSummary";
import ProductAttributes from "./../components/Product/ProductAttributes";
import baseUrl from "./../utils/baseUrl";

function Product({ singleProduct }) {
  return (
    <>
      <ProductSummary {...singleProduct} />
      <ProductAttributes {...singleProduct} />
    </>
  );
}

Product.getInitialProps = async ({ query }) => {
  try {
    const url = `${baseUrl}/api/product?_id=${query._id}`;
    const response = await axios.get(url);
    const singleProduct = response.data;
    return { singleProduct: singleProduct };
  } catch (err) {
    console.log(`Client error! ${err}`);
  }
};

export default Product;

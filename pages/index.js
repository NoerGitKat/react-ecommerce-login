import { useEffect } from "react";
import axios from "axios";
import baseUrl from "./../utils/baseUrl";

// Components
import ProductList from "./../components/Index/ProductList";

function Home(props) {
  const { products } = props;

  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  try {
    const url = `${baseUrl}/api/products`;
    const response = await axios.get(url);
    const products = response.data;
    return { products };
  } catch (err) {
    console.log(`Client Error! ${err}`);
  }
};

export default Home;

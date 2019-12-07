import { useEffect } from "react";
import axios from "axios";
import baseUrl from "./../utils/baseUrl";

// Components
import ProductList from "./../components/Index/ProductList";
import ProductPagination from "./../components/Index/ProductPagination";

function Home({ products, totalPages }) {
  console.log("totalPages", totalPages);
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const payload = { params: { page, size } };
  try {
    const url = `${baseUrl}/api/products`;
    const response = await axios.get(url, payload);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(`Client Error! ${err}`);
  }
};

export default Home;

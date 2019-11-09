import { useEffect } from 'react';
import axios from 'axios';
import baseUrl from './../utils/baseUrl';

// Components
import ProductList from './../components/Index/ProductList';

function Home(props) {
  const { products } = props;

  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  const products = response.data;
  return { products };
};

export default Home;

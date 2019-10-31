import { useEffect } from 'react';
import axios from 'axios';

function Home(props) {
  const { products } = props;

  return <>home</>;
}

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);
  const products = response.data;
  return { products };
};

export default Home;

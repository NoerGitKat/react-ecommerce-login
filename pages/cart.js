import axios from "axios";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import baseUrl from "./../utils/baseUrl";
import CartItemList from "./../components/Cart/CartItemList";
import CartSummary from "./../components/Cart/CartSummary";

function Cart({ products, user }) {
  return (
    <Segment>
      <CartItemList products={products} user={user} />
      <CartSummary products={products} />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  // Fetch user's cart before component load
  const { authToken } = parseCookies(ctx);

  // No logged in user, return empty cart
  if (!authToken) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { authorization: authToken } };
  const response = await axios.get(url, payload);
  return { products: response.data };
};

export default Cart;

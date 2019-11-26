import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import baseUrl from "./../utils/baseUrl";
import CartItemList from "./../components/Cart/CartItemList";
import CartSummary from "./../components/Cart/CartSummary";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);

  const handleRemoveCartProduct = async id => {
    // 1. Send product ID as payload to endpoint
    const endpoint = `${baseUrl}/api/cart`;
    // Only possible if authoenticated
    const token = cookie.get("authToken");
    const payload = {
      params: {
        cartProductId: id
      },
      headers: {
        Authorization: token
      }
    };
    const response = await axios.delete(endpoint, payload);

    // 2. Re-set state
    setCartProducts(response.data);
  };

  return (
    <Segment>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveCartProduct={handleRemoveCartProduct}
      />
      <CartSummary products={cartProducts} />
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

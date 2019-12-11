import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import catchErrors from "./../utils/catchErrors";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import baseUrl from "./../utils/baseUrl";
import CartItemList from "./../components/Cart/CartItemList";
import CartSummary from "./../components/Cart/CartSummary";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveCartProduct = async id => {
    try {
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
    } catch (err) {}
  };

  const handleCheckout = async paymentData => {
    try {
      setIsLoading(true);
      const endpoint = `${baseUrl}/api/checkout`;

      const authToken = cookie.get("authToken");
      const payload = {
        paymentData
      };
      const headers = {
        headers: {
          Authorization: authToken
        }
      };

      const response = await axios.post(endpoint, payload, headers);

      setIsSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Segment loading={isLoading}>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveCartProduct={handleRemoveCartProduct}
        isSuccess={isSuccess}
      />
      <CartSummary
        products={cartProducts}
        handleCheckout={handleCheckout}
        isSuccess={isSuccess}
      />
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

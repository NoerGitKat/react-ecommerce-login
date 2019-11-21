import axios from "axios";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";
import baseUrl from "./../../utils/baseUrl";

function AddProductToCart({ productId, user }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleChange = e => {
    const { value } = e.target;

    setQuantity(value);
  };

  const handleAddProductToCart = async (productId, quantity) => {
    // API call to /cart
    const endpoint = `${baseUrl}/api/cart`;
    const payload = { productId, quantity };

    // Can only make request if authorizaed
    const authToken = cookie.get("authToken");
    const headers = { headers: { Authorization: authToken } };

    const response = await axios.put(endpoint, payload);
  };

  return (
    <>
      <Input
        type="number"
        min="1"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        placeholder="Quantity"
        action={
          user
            ? {
                color: "orange",
                content: "Add to cart",
                icon: "plus cart",
                onClick: () => handleAddProductToCart(productId, quantity)
              }
            : {
                color: "blue",
                content: "Sign Up to Purchase!",
                icon: "signup",
                onClick: () => router.push("/signup")
              }
        }
      />
    </>
  );
}

export default AddProductToCart;

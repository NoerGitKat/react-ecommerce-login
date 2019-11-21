import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";
import baseUrl from "./../../utils/baseUrl";
import catchErrors from "./../../utils/catchErrors";

function AddProductToCart({ productId, user }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    const { value } = e.target;

    setQuantity(value);
  };

  const handleAddProductToCart = async (productId, quantity) => {
    try {
      setIsLoading(true);
      // API call to /cart
      const endpoint = `${baseUrl}/api/cart`;
      const payload = { productId, quantity };

      // Can only make request if authorizaed
      const authToken = cookie.get("authToken");

      const headers = { headers: { Authorization: authToken } };

      const response = await axios.put(endpoint, payload, headers);
      // If response succeeded send back success message to user
      setIsSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

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
          user && isSuccess
            ? {
                color: "blue",
                content: "Product added!",
                icon: "plus cart",
                disabled: true
              }
            : user
            ? {
                color: "orange",
                content: "Add to cart",
                icon: "plus cart",
                loading: isLoading,
                disabled: isLoading,
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

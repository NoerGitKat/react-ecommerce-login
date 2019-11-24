import { useState, useEffect } from "react";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "./../../utils/calculateCartTotal";

function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    setIsCartEmpty(products.length === 0);
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>
  );
}

export default CartSummary;

import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "./../../utils/calculateCartTotal";

function CartSummary({ products, handleCheckout, isSuccess }) {
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
        <StripeCheckout
          name="React Online Shop"
          amount={stripeAmount}
          description={"Buy some shit"}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey="pk_live_TGjvuSuHlMepcHyYUOJAK7kT00ikW5LcfF"
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || isSuccess}
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;

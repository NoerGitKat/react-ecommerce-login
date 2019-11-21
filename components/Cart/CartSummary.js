import { useState, useEffect } from "react";
import { Button, Segment, Divider } from "semantic-ui-react";

function CartSummary({ products }) {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    setIsCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $0.00
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

import { Header, Segment, Icon, Button } from "semantic-ui-react";
import Link from "next/link";

function CartItemList({ user, products }) {
  console.log("user", user);
  console.log("products", products);
  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No products in your cart. Add some!
      </Header>
      <div>
        {user ? (
          <Button color="orange">View Products</Button>
        ) : (
          <Link href="/login">
            <Button color="blue">Login to Add Products</Button>
          </Link>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;

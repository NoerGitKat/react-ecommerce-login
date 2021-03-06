import {
  Header,
  Segment,
  Icon,
  Button,
  Item,
  Message
} from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList({ user, products, handleRemoveCartProduct, isSuccess }) {
  const router = useRouter();

  const mapCartProductsToItems = products => {
    return products.map(p => {
      const { product } = p;
      return {
        header: (
          <Item.Header
            as="a"
            onClick={() => router.push(`/product?_id=${product._id}`)}
          >
            {product.name}
          </Item.Header>
        ),
        childKey: product._id,
        image: product.mediaUrl,
        meta: `${p.quantity} x $${product.price}`,
        fluid: "true",
        extra: (
          <Button
            icon="remove"
            floated="right"
            onClick={() => handleRemoveCartProduct(product._id)}
          />
        )
      };
    });
  };

  if (isSuccess) {
    return (
      <Message
        success={true}
        header="Success!"
        content="Your order and payment has been accepted!"
        icon="star outline"
      />
    );
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  } else {
    return <Item.Group items={mapCartProductsToItems(products)}></Item.Group>;
  }
}

export default CartItemList;

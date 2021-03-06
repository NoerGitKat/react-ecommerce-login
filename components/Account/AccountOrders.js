import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  Button,
  List,
  Image
} from "semantic-ui-react";
import formatDate from "./../../utils/formatDate";
import { useRouter } from "next/router";

function AccountOrders({ orders }) {
  const router = useRouter();

  const mapOrdersToPanels = orders => {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(product => {
                console.log("product", product);
                return (
                  <List.Item key={product._id}>
                    <Image avatar src={product.product.mediaUrl} />
                    <List.Content>
                      <List.Header>{product.product.name}</List.Header>
                      <List.Description>
                        Quantity: {product.quantity}
                      </List.Description>
                      <List.Description>
                        Total Price: ${product.product.price}
                      </List.Description>
                    </List.Content>
                    <List.Content floated="right">
                      <Label tag color="red" size="tiny">
                        {product.product.sku}
                      </Label>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </>
        )
      }
    }));
  };

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
          <div>
            <Button onClick={() => router.push("/")} color={"orange"}>
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion fluid styled exclusive panels={mapOrdersToPanels(orders)} />
      )}
    </>
  );
}

export default AccountOrders;

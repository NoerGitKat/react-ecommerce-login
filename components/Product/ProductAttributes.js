import { useState } from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

function ProductAttributes({ description, _id, user }) {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  let isAdminOrRootUser;
  if (user) {
    isAdminOrRootUser = user.role === "admin" || user.role === "root";
  }

  const handleDelete = async () => {
    try {
      const url = `${baseUrl}/api/product`;
      const payload = { params: { _id } };
      // Empty response
      await axios.delete(url, payload);
      router.push("/");
    } catch (err) {
      console.log(`Client error! ${err}`);
    }
  };

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {isAdminOrRootUser ? (
        <>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete Product"
            onClick={() => setIsOpened(true)}
          />
          <Modal open={isOpened} dimmer="blurring">
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setIsOpened(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={() => {
                  handleDelete();
                  setIsOpened(false);
                }}
              />
            </Modal.Actions>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default ProductAttributes;

import { useState } from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from 'semantic-ui-react';
// import ProductModel from './../models/Product';

const INITIAL_STATE = {
  name: '',
  price: '',
  media: '',
  description: ''
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_STATE);
  const [mediaPreview, setMediaPreview] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;

    // Get file
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    //  TODO: insert into DB

    setProduct(INITIAL_STATE);
    setIsSuccess(true);
  };

  console.log(product);

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={isSuccess} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been created!"
        />
        <Form.Group>
          <Form.Field
            control={Input}
            name="name"
            value={product.name}
            label="Name"
            placeholder="Your name..."
            type="text"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            value={product.price}
            label="Price"
            placeholder="0.00"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            accept="image/*"
            label="Media"
            type="file"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        {product.media ? (
          <Image src={mediaPreview} rounded centered size="small" />
        ) : null}
        <Form.Field
          control={TextArea}
          name="description"
          value={product.description}
          label="Description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Create Product"
        />
      </Form>
    </>
  );
}

export default CreateProduct;

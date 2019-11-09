import { useState, useEffect } from 'react';
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
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleImageUpload = async img => {
    const imgData = new FormData();
    imgData.append('file', product.media);
    imgData.append('upload_preset', 'onlineshop');
    imgData.append('cloud_name', 'noerimages');
    const response = await axios.post(process.env.CLOUDINARY_URL, imgData);
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const mediaUrl = await handleImageUpload();
      const apiUrl = `${baseUrl}/api/product`;
      const payload = { ...product, mediaUrl };
      const response = await axios.post(apiUrl, payload);
      console.log(response);
      setProduct(INITIAL_STATE);
      setIsSuccess(true);
    } catch (err) {
      console.error('ERROR! The form submission failed:', err);
      catchErrors(err, setErrorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Disable submit button if fields empty
    const productValues = Object.values(product);
    const productIsNotEmpty = productValues.every(value => Boolean(value));
    if (productIsNotEmpty) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [product]);

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form
        loading={isLoading}
        error={Boolean(errorMsg)}
        success={isSuccess}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={errorMsg} />
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
          disabled={isDisabled || isLoading}
          icon="pencil alternate"
          content="Create Product"
        />
      </Form>
    </>
  );
}

export default CreateProduct;

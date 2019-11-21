const calculateCartTotal = products => {
  products.reduce((accumulator, element) => {
    accumulator += element.product.price * element.quantity;
    return accumulator;
  }, 0);
};

export default calculateCartTotal;

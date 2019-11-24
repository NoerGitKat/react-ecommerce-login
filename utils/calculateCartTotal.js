const calculateCartTotal = products => {
  const total = products.reduce((totalResult, currentVal) => {
    totalResult += currentVal.product.price * currentVal.quantity;
    return totalResult;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));
  return {
    cartTotal,
    stripeTotal
  };
};

export default calculateCartTotal;

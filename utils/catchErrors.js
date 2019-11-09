const catchErrors = (error, displayError) => {
  let errorMsg;
  // Only applies to axios
  if (error.response) {
    // Response is not in range of 2XX
    errorMsg = error.response.data;
    console.error('Error response', errorMsg);

    // Cloudinary image upload error
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // Request made, but not response
    errorMsg = error.request;
    console.error('Error request', errorMsg);
  } else {
    // Something else happened to the request
    errorMsg = error.message;
    console.error('Error message', errorMsg);
  }
  displayError(errorMsg);
};

export default catchErrors;

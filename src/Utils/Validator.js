export const validatePassword = (value, callback) => {
  if (value && value !== "Secret") {
    callback("Error!");
  } else {
    callback();
  }
};

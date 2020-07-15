export const validateString = (str) => {
  if (str !== null && typeof str === "string" && str.length > 0) {
    return str;
  } else {
    return false;
  }
};

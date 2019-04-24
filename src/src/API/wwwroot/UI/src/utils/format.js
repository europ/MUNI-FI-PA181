export const isJSON = text => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const removeArrayElement = (obj, id) => {
  const index = obj.indexOf(id);
  obj.splice(index, 1);
  return obj;
};

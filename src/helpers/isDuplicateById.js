export const isDuplicateById = (array, id) => {
  return array.some(item => item.id === id);
};
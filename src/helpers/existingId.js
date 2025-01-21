export const existingId = (array, id) => {
  const existing = array.some(item => item.id === id);
  if (existing) {
    console.error(`The ID: ${id} already exists`);
    return true;
  }
  return false;
};

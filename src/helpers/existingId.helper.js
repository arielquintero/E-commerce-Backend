export const existingId = (array, id) => {
  const existing = array.some(item => item.id === id);
  if (existing) {
    console.error(`The ID: ${id} already exists`);
    return true;
  }
  return false;
};



// export const existingId = (array) => {
//   const id = array.find((item) => item.id === array.id) 
//   if(id){
//     console.log(`The ID: ${id} already exists`)
//     return  
//   }
// }
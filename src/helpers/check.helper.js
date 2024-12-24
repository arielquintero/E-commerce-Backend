export const checkMissingFields = (payload, expectedFields, optionalFields = []) => {
  const requiredFields = expectedFields.filter(field => !optionalFields.includes(field));
  const missingFields = requiredFields.filter(
    field => !(field in payload) || payload[field] == null || String(payload[field]).trim() === ''
  );

  return missingFields.length > 0
    ? `The following fields are missing or invalid: ${missingFields.join(', ')}`
    : null;
};








// export const checkMissingFields = (payload, expectedFields, optionalFields = []) => {
  
//   const requiredFields = expectedFields.filter(field => !optionalFields.includes(field));

//   const missingField = requiredFields.filter(field => 
//     !payload.hasOwnProperty(field) || payload[field] == null || String(payload[field]).trim() === ''
//   );

//   if (missingField.length > 0) {
//     return `The following fields are missing from the request: ${missingField.join(', ')}`;
//   }
//   return null;
// }

  // if(missingField.length > 0){
  //   let message = `The following fields are missing from the request: `
  //   for(let i = 0; i< missingField.length; i++){
  //     message += missingField[i]
  //     if (i < missingField.length -1){
  //       message += ", "
  //     }
  //   }
  //   return message
  // }
  // return null
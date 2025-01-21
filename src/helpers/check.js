export const checkMissingFields = (payload, expectedFields, optionalFields = []) => {
  const requiredFields = expectedFields.filter(field => !optionalFields.includes(field));
  const missingFields = requiredFields.filter(
    field => !(field in payload) || payload[field] == null || String(payload[field]).trim() === ''
  ); 
  if (missingFields.length > 0){
    return `The following fields are missing or invalid: ${missingFields.join(', ')}`
  }
  return null;
};

import { ValidationError } from "../error/validationError.js";


const validateProduct = async (product) => {
 const { title, description, code, price, stock, category, status, thumbnails } = product
 if (!title || typeof title !== 'string' || title.trim() === "") {
   throw new ValidationError('The title is required and must be a non-empty string.');
 }
 if (title.length > 100) {
     throw new ValidationError('The title cannot exceed 100 characters.')
 }
 if (!description || typeof description !== 'string' || description.trim() === "") {
   throw new ValidationError('The description is required and must be a non-empty string.');
 }
 if (description.length > 500) {
     throw new ValidationError('The description cannot exceed 500 characters.')
 }
 if (!code || typeof code !== 'string' || code.trim() === "") {
   throw new ValidationError('The code is required and must be a non-empty string.');
 }
 if (code.length > 14) {
     throw new ValidationError('The code cannot exceed 14 characters.')
 }
 if (!price || typeof price !== 'number' || price <= 0) {
   throw new ValidationError('The price is mandatory and must be a positive number.');
 }
 if (!stock || typeof stock !== 'number' || stock < 0) {
   throw new ValidationError('The stock is mandatory and must be a non-negative number.');
 }
 if (!category || typeof category !== 'string' || category.trim() === "") {
   throw new ValidationError('The category is required and must be a non-empty string.');
 }
 if (!status || typeof status !== 'boolean') {
     throw new ValidationError('The state is required and must be a boolean.')
 }
//  if (!Array.isArray(thumbnails)) {
//    throw new ValidationError('Thumbnails must be an array of images.');
//  }
 return product;
}

export { validateProduct }
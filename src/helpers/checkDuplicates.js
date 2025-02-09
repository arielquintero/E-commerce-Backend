import { product } from "../models/product.model.js";

async function checkProductExistsInCategory({ title, code, category }) {
  // Validar si ya existe un producto con el mismo título y código en la categoría
  const existingProduct = await product.findOne({ title, code, category });
  console.log(existingProduct);
  if (existingProduct) {
    throw new Error(`The product with title "${title}" and code "${code}" already exists in category "${category}"`);
  }

  // Validar si ya existe un producto con el mismo título en la categoría (pero con código diferente)
  const existingTitleProduct = await product.findOne({ title, category });
  console.log(existingTitleProduct);
  if (existingTitleProduct) {
    throw new Error(`The product with title "${title}" already exists in category "${category}"`);
  }

  // Validar si ya existe un producto con el mismo código en la categoría (pero con título diferente)
  const existingCodeProduct = await product.findOne({ code, category });
  console.log(existingCodeProduct);
  if (existingCodeProduct) {
    throw new Error(`The product with code "${code}" already exists in category "${category}"`);
  }
}

export { checkProductExistsInCategory };
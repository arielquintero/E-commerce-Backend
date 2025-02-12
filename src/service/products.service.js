import { validateProduct, isValidID } from '../helpers/index.js';
import { Product } from '../models/product.model.js';

class ProductsService {
  constructor() { }


  async getAllProductsForQuery(filter, options) {
    let products = await Product.paginate(filter, options)
    console.log(typeof(products))
    return products
  }

  async getAllProducts() {
    const products = await Product.find();
    if (!products || products.length === 0) { throw new Error(`❌ The product not found`) }
    return products;
  }

  async createProduct(newProduct) {
    const validatedProduct = await validateProduct(newProduct)
    const savedProduct = new Product(validatedProduct);
    await savedProduct.save();
    return savedProduct;
  }

  async getProductById({ id }) {

    if (!isValidID(id)) { throw new Error(`❌ The product ID ${id} is invalid`) }

    const productID = await Product.findById(id)

    if (!productID) { throw new Error(`❌ The product with id ${id} not found`) }
    return productID;
  }

  async update(id , newInfo) {

    if (!isValidID(id)) { throw new Error(`❌ The product ID ${id} is invalid`) }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id }, // Filter of ID
      newInfo,     // New data
      { new: true, runValidators: true }
    );
    if (!updatedProduct) { throw new Error(`❌ The product with id ${id} not found`) }

    return updatedProduct;
  }

  async delete({ id }) {

    if (!isValidID(id)) { throw new Error(`❌ The product ID ${id} is invalid`) } 

    const deletedProduct = await Product.findByIdAndDelete(id)
    
    if (!deletedProduct) { throw new Error(`❌ The product with id ${id} not found`) }
    return
  }
}

export const productsService = new ProductsService()
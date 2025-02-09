//import fs from 'node:fs';  
import { Product } from '../models/product.model.js';
//import { checkProductExistsInCategory,checkMissingFields, existingId } from '../helpers/index.js';

class ProductsService {
  //constructor({ path }) {
  
    //this.path = path;
    // this.products = [];

    // if (fs.existsSync(path)) {
    //   try {
    //     this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    //   } catch (error) {
    //     console.error("Error reading products file:", error.message);
    //   }
    // }
  constructor() {}


  async createProduct(newProduct) {
    //console.log(newProduct)
    //const { title, code, category } = newProduct;
    try {
      //await checkProductExistsInCategory({ title, code, category });
      const savedProduct = new Product(newProduct);
      await savedProduct.save();
      return savedProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }






    //const requiredFields = productModels.getRequiredField();
    //const optionalFields = ["thumbnails"];
    //const messageErrorMissingField = checkMissingFields(payload, requiredFields, optionalFields);

    // if (messageErrorMissingField) {
    //   console.error(messageErrorMissingField);
    //   return null;
    // }


    /*
    const { price, stock, code } = payload;

    const existingCodeProduct = this.products.find(product => product.code === code)
    if (existingCodeProduct){
      console.error(`The product with code ${code} already exists`)
      return null
    }
    //************************************************************************************************
    if ( !Number.isFinite(price) || price <= 0 ) {
      console.error("The price must be a valid number greater than 0");
      return null;
    }
    if ( !Number.isFinite(stock) || stock <= 0) {
      console.error("The stock must be a valid number greater than 0");
      return null;
    }

    */
    //this.products.push(product);

  //   try {
  //     await fsSave(this.path, this.products);
  //     return product;
  //   } catch (error) {
  //     console.error("Error saving product:", error.message);
  //     return null;
  //   }
    // const product = new product(productInfo);
    // if (existingId(this.products, product.id)) {
    //   return null;
    // }
  }

  async getAllProducts() {
    try {
      const products = await Product.find();
      //console.log(products);
      if (!products || products.length === 0){
        throw new Error('Products not found');
      }
      //console.log(products);
      return products;
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const productID = await Product.findById(id).populate('products.product');

      if (!productID) {
        console.error(`Product with ID: ${id} not found`);
        return null;
      }
      console.log(productID);
      return productID;
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

 async update(id, newInfo) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id }, // Filtro por ID
      newInfo,     // Nuevos datos
      { new: true, runValidators: true } // Opciones: devolver el documento actualizado y ejecutar validadores
    );
    if (!updatedProduct) {
      throw new Error(`Product with ID: ${id} not found`);
    }

    return updatedProduct;
  } catch (error) {
    //console.error("Error updating product:", error.message);
    throw new Error(`Error updating product: ${error.message}`);
  }
}

  async delete(id) {

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      //console.error("Product not found for ID: ", id);
      throw new Error(`Product not found for ID: ${id}`);
    }
    return
  }
}
//export const productsLogic = new ProductsLogic({ path: "./src/db/products.json" });
export const productsService = new ProductsService();


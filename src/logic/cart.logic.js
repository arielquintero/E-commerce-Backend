import fs from 'node:fs'
import { isDuplicateById, fsSave, validateJsonFile } from '../helpers/index.js';
import { v4 as uuid } from 'uuid'
import path from 'node:path';
import { __dirname } from '../../dirname.js'

//const PRODUCTS_PATH = path.join(process.cwd(), 'src', 'db', 'products.json');
const PRODUCTS_PATH = path.resolve(__dirname, 'src', 'db', 'products.json');

console.log('PRODUCTS_PATH:', PRODUCTS_PATH);
console.log('Current working directory (process.cwd()):', process.cwd());
console.log('Current file directory (__dirname):', __dirname);

class CartLogic {
  constructor({ path }) {
    this.path = path;
    this.carts = [];
   
    if (fs.existsSync(path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(path, 'utf-8'));
      } catch (error) {
        console.error('Error reading carts:', error.message);
      }
    }

  }
  // FUNCTION PARA VALIDACION DE SI EL PRODUCT.ID EXISTE EN PRODUCTS.JSON
  async isValidProduct(productId) {
    return validateJsonFile(PRODUCTS_PATH, (products) => {
      return products.some(product => product.id === productId)
    });
  }

  async getCartById({ id }) {
    if (!id) {
      throw new Error('ID is required');
    }

    const cart = this.carts.find(cart => cart.id === id);
    if (!cart) {
      throw new Error(`Cart with ID: ${id} not found`);
    }
    return cart;
  }

  async addProductByIdCart({ cartId, productId, quantity = 1 }) {
    // VALIDAMIOS QUE EL CARRITO EXISTE
    const cart = await this.getCartById({ id: cartId });

    // VALIDAMOS QUE EL PRODUCTO EXISTA
    const isValid = await this.isValidProduct(productId);
    if (!isValid) {
      throw new Error(`Product ID: ${productId} does not exist`);
    }

    // BUSCO EL PRODUCTO SI YA EXISTE EN EL CARRITO
    const productIndex = cart.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {

      // INCREMENTO SI EXISTE EL PRODUCTO EN ECARRITO
      cart.products[productIndex].quantity += quantity;
    } else {

      // AGREGO EL NUEVO PRODUCTO AL CARRITO
      cart.products.push({ id: productId, quantity });
    }

    // GUARDAMOS EL CARRITO ACTUALIZADO
    return this.updateCart({ id: cartId, products: cart.products });
  }

  async createNewCart() {
    const id = uuid();
    const newCart = { id, products: [] };

    // EVITAMOS DUPLICADOS
    if (isDuplicateById(this.carts, id)) {
      throw new Error('A cart with the same ID already exists');
    }

    this.carts.push(newCart);

    try {
      await fsSave(this.path, this.carts);
      return newCart;
    } catch (error) {
      console.error('Error saving cart:', error.message);
      throw new Error('Error saving cart');
    }
  }

  async updateCart({ id, products }) {
    const cartIndex = this.carts.findIndex(cart => cart.id === id);
    if (cartIndex === -1) {
      throw new Error(`Cart with ID: ${id} not found`);
    }

    this.carts[cartIndex].products = products;

    try {
      await fsSave(this.path, this.carts);
      return this.carts[cartIndex];
    } catch (error) {
      console.error('Error saving cart:', error.message);
      throw new Error('Error saving cart');
    }
  }
}

export const cartLogic = new CartLogic({ path: './src/db/carts.json' });









// class CartLogic {
//   constructor({ path }) {
//     this.path = path;
//     this.carts = []
//     if (fs.existsSync(path)) {
//       try {
//         this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
//       } catch (error) {
//         console.error('Error reading carts:', error.message)
//       }
//     }
//    }

//   async isValidProduct(productId) {
//     try {
//       const productsData = await fs.readFile(PRODUCTS_PATH, 'utf-8');
//       const products = JSON.parse(productsData);

//       // Usar existingId para validar si el producto existe
//       const isValid = existingId(products, productId);
//       if (!isValid) {
//         console.error(`Product ID: ${productId} does not exist`);
//       }
//       return isValid;
//     } catch (error) {
//       console.error('Error reading products.json:', error.message);
//       throw new Error('Error verifying product ID');
//     }
//   }

//   async getCartById({ id }) {
//     if(!id){
//       throw new Error('ID is required')
//     }
  
//     const cart =  this.carts.find((cart) => cart.id === id)
    
//     if (!cart) {
//       throw new Error(`Cart with ID: ${id} not found`);
//     }
//     return cart
//   }

//   async addProductByIdCart({ cartId, productId, quantity = 1 }) {
//     // VALIDAMOS QUE EL CARRITO EXISTA
//     const cart = await this.getCartById({ id: cartId });

//     // VALIDAMOS QUE EL PRODUCTO EXISTA
//     const existProduct = await this.isValidProduct(productId);
//     if(!existProduct){
//       throw new Error(`Product with ${productId} does not exist`)
//     }

//     //TODO: Incrementando la cantidad de productos si el producto existe en el carrito
//     const existingProductToCart = cart.products.findIndex(id => id.product === pid)
//     if (existingProductToCart !== -1) {
//       cart.products[existingProductToCart].quantity++
//     } else {
//       cart.products.push({ product: pid, quantity: 1 })
//     }
//   }

//   async createNewCart( products = [] ) {

//     // CREAMOS UN NUEVO CARRITO
//     const id = uuid()

//     // CONTROL PARA CARRITOS CON ID UNICOS
//     if (isDuplicateById(this.carts, id)) {
//       throw new Error('A cart with the same ID already exists')
//     }

//     const newCart = { id, products}
//     this.carts.push(newCart)

//     try {
//       await fsSave(this.path, this.carts)
//       return newCart
//     }catch (error) {
//       console.error('Error saving cart:', error.message)
//       throw new Error('Error saving cart')
//     }
//   }
//   async updateCart({ id, products }) {
//     try {
//       const cart = await this.getCartById({ id });

//       if (!cart) {
//         throw new Error(`Cart with ID: ${id} not found`)
//       };

//       cart.products = products;
//       await fsSave(this.path, this.carts)
//       return cart
//     } catch (error) {
//       console.error('Error updating cart: ', error.message);
//       throw error
//     }
//   }
// }

// export const cartLogic = new CartLogic({ path: './src/db/carts.json' })

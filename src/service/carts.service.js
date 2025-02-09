import { Product } from '../models/product.model.js';
import { Cart } from '../models/cart.model.js';
import { isValidID } from '../helpers/index.js';
import { __dirname } from '../../dirname.js'

class CartsService {
  constructor() {
    //this.updateQuantityProduct = this.updateQuantityProduct.bind(this);
  }

  async getCartById(cid) {
    
    if (!cid) { throw new Error('ID is required') }

    const cartId = await Cart.findById(cid)
    
    if (!cartId) { 
      throw new Error(`Cart with ID: ${cid} not found`) 
      }
    return cartId
  }

  async createNewCart() {
    try {
      const newCart = new Cart()

      await newCart.save()
      
      return newCart
    
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`)
    }
  }

  async addProductByIdCart({ cid, pid}) {
    try {
      if(!isValidID(cid) || !isValidID(pid)) { throw new Error('Cart ID and Product ID is invalid') }
      
      const cart = await Cart.findById(cid)
      if(!cart) { throw new Error('Not fount cart') }

      const product = await Product.findById(pid)
      
      if(!product) { throw new Error('Not fount product') }

      if (product.stock <= 0) {
      throw new Error(`❌ Product ${product.title} is out of stock and cannot be added.`);
      }

      const productInCart = cart.products.find(prod => prod.product.equals(product._id))

      if (productInCart) {
        productInCart.quantity += 1
        product.stock -= 1
        productInCart.product.stock = product.stock  
        }
        else {
          cart.products.push({product: product._id, stock: product.stock - 1})
          }

      await Product.updateOne(
        {_id: pid},
        {$inc: { stock: -1 }}
        )
      console.log(product.stock)

      cart.markModified('products')
      await cart.save()

      return cart

    } catch (error) {
        throw new Error(`Error adding product to cart: ${error.message}`)
    }
  }

  async updateQuantityProduct(cid, pid, quantity) {
    try {

      if (!isValidID(cid) || !isValidID(pid)) { throw new Error('Cart ID and Product ID is invalid') }

      const cart = await Cart.findById(cid)

      if (!cart) { throw new Error('Cart not found in the database') }

      let numQuantity = Number(quantity)
      
      if (isNaN(numQuantity) || numQuantity === 0) { throw new Error('Quantity must be a non-zero number') }

      const indexProductInCart = cart.products.findIndex(prod => prod.product.equals(pid))
      
      if (indexProductInCart === -1) { throw new Error('No existing product in cart with: ',pid)} 

      const currentQuantity = cart.products[indexProductInCart].quantity

      const newQuantity = currentQuantity + numQuantity

      if (newQuantity < 0 ) { throw new Error('When updating to the new quantity it remains below zero') }

      const updatedStock = await this.#updatedAndCheckingStock(pid, numQuantity)

      newQuantity === 0 
      ? cart.products.splice(indexProductInCart, 1) 
      : cart.products[indexProductInCart].quantity = newQuantity;
      
      cart.markModified('products')

      const updatedCart = await cart.save()

      return { updatedCart, updatedStock }

    } catch (error) { 
      throw new Error('❌ Error updanting cart')      
    }
  }

  async deleteProductInCart({ cid, pid }) {
    console.log(pid)
    try {
      if (!isValidID(cid) || !isValidID(pid)) { throw new Error('Cart ID and Product ID is invalid') }

      const cart = await Cart.findById(cid);

      if (!cart) { throw new Error('Cart not found') }
      
      const productId = await Product.findById(pid);

      if(!productId) { throw new Error('Not fount product') }
    
      console.log(productId.stock)

      const productIndex = cart.products.findIndex(product => product.product.equals(pid));

      const productInCart = cart.products.find(product => product.product._id.equals(pid))

      let quantity = productInCart.quantity

      await Product.updateOne(
        {_id: pid},
        {$inc: { stock: +quantity }}
        ) 

      if (productIndex !== -1) { cart.products.splice(productIndex, 1) }

      cart.markModified('products');

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error deleting product to cart: ${error.message}`)
    }
  }

  async deleteAllProductsInCart(cid) {
    try {
      if (!isValidID(cid)) {
        throw new Error('Cart ID is invalid')
      }

      const cart = await Cart.findById(cid)

      if (!cart) {
        throw new Error('Cart not found')
      }

      cart.products = []

      cart.markModified('products')

      await cart.save()

      return cart

    } catch (error) {
      throw new Error(`Error deleting all products to cart: ${error.message}`)
    }
  }

  async updateCart({ id, products }) {
    const cartIndex = this.carts.findIndex(cart => cart.id === id)

    if (cartIndex === -1) { throw new Error(`Cart with ID: ${id} not found`) }

    this.carts[cartIndex].products = products
  }

  async #updatedAndCheckingStock(pid, quantityChange=null) {
    
    try {
      
      const product = await Product.findById(pid)

      let newStock = product.stock - quantityChange

      if (quantityChange > 0 && product.stock < quantityChange) { throw new Error(`Not enough stock. Only ${product.stock} units available`) }

      if (quantityChange < 0) { newStock = product.stock + (-1)*quantityChange }

      product.stock = newStock

      await product.save()
      console.log(`✅ Nuevo stock de ${pid}: ${product.stock}`);
      return product.stock
    } catch (error) {
      console.error('❌ ERROR REAL en updateStock:', error);
      throw new Error(`Error updating stock: ${error.message}`);
    }
  }
}
//export const cartLogic = new CartLogic({ path: './src/db/carts.json' });
export const cartsService = new CartsService();
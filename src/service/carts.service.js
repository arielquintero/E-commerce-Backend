import { Product } from '../models/product.model.js';
import { Cart } from '../models/cart.model.js';
import { isValidID } from '../helpers/index.js';
import { __dirname } from '../../dirname.js'

class CartsService {
  constructor() { }

  async getCartById({ cid }) {

    if (!isValidID(cid)) { throw new Error(`❌ The cart ID ${cid} is invalid`) }

    if (!cid) { throw new Error('❌ The ID is required') }

    const cart = await Cart.findById(cid).populate('products.product').lean()

    if (!cart) { throw new Error(`❌ The cart not found in the database with id ${cid}`) }

    return cart
  }

  async createNewCart() {
  
    const newCart = new Cart()

    await newCart.save()

    return newCart

  }

  async addProductByIdCart({ cid, pid }) {
    
    if (!isValidID(cid) || !isValidID(pid)) { throw new Error(`❌ The cart ID ${cid} and Product ID ${pid} is invalid`) }

    const cart = await Cart.findById(cid)
    if (!cart) { throw new Error(`❌ The cart not found in the database with id ${cid}`) }

    const product = await Product.findById(pid)

    if (!product) { throw new Error(`❌ The product with id ${pid} not found`) }

    if (product.stock <= 0) {
      throw new Error(`❌ The product ${product.title} is out of stock and cannot be added.`);
    }

    const productInCart = cart.products.find(prod => prod.product.equals(product._id))

    if (productInCart) {
      productInCart.quantity += 1
      product.stock -= 1
      productInCart.product.stock = product.stock
    }
    else {
      cart.products.push(
        {
          product: product._id, stock: product.stock - 1
        }
      )
    }

    await Product.updateOne(
      { _id: pid },
      { $inc: { stock: -1 } }
    )

    cart.markModified('products')
    await cart.save()

    return cart

  }

  async updateQuantityProduct(cid, pid, quantity) {

    if (!isValidID(cid) || !isValidID(pid)) { throw new Error(`❌ The cart ID and Product ID ${pid} is invalid`) }

    const cart = await Cart.findById(cid)

    if (!cart) { throw new Error(`❌ The cart not found in the database with id ${cid}`) }

    const product = await Product.findById(pid)

    if (!product) { throw new Error(`❌ The product with id ${pid} not found`) }

    let numQuantity = Number.parseInt(quantity)

    if (isNaN(numQuantity) || (!isFinite(numQuantity)) || numQuantity === 0) { throw new Error('❌ The quantity must be a non-zero number') }

    const indexProductInCart = cart.products.findIndex(prod => prod.product.equals(pid))

    if (indexProductInCart === -1) { throw new Error(`❌ No existing product in cart with: ${pid}`) }

    let currentQuantity = cart.products[indexProductInCart].quantity

    let newQuantity = currentQuantity + numQuantity

    if (newQuantity < 0) { throw new Error('❌ When updating to the new quantity it remains below zero') }

    //console.log('Updating product stock:', { pid, newQuantity, currentQuantity });

    let stockChange = -numQuantity

    if (numQuantity > 0 && product.stock < numQuantity) {
      throw new Error(`❌ Not enough stock available. Available: ${product.stock}, Required: ${numQuantity}`);
    }

    await Product.updateOne(
      { _id: pid },
      { $inc: { stock: stockChange } }
    )

    if (newQuantity === 0) {
      cart.products.splice(indexProductInCart, 1)
    } else {
      cart.products[indexProductInCart].quantity = newQuantity
    }

    cart.markModified('products')

    const updatedCart = await cart.save()

    await updatedCart.populate('products.product')

    return updatedCart

  }

  async deleteOneProductInCart({ cid, pid }) {
    
    if (!isValidID(cid) || !isValidID(pid)) { throw new Error(`❌ The cart ID and Product ID: ${pid} is invalid`) }

    const cart = await Cart.findById(cid);

    if (!cart) { throw new Error(`❌ The cart not found in the database with id ${cid}`) }

    const productId = await Product.findById(pid)

    if (!productId) { throw new Error(`❌ The product with id ${pid} not found`) }

    console.log(productId.stock)

    const productIndex = cart.products.findIndex(product => product.product.equals(pid))

    const productInCart = cart.products.find(product => product.product._id.equals(pid))

    let quantity = productInCart.quantity

    await Product.updateOne(
      { _id: pid },
      { $inc: { stock: +quantity } }
    )

    if (productIndex !== -1) { cart.products.splice(productIndex, 1) }

    cart.markModified('products')

    await cart.save()

    return cart

  }

  async deleteAllProductsInCart({ cid }) {
    
    if (!isValidID(cid)) {
      throw new Error(`❌ The ID not valid id ${cid}`)
    }

    const cart = await Cart.findById(cid)

    if (!cart) {
      throw new Error(`❌ The cart not found in the database with id ${cid}`)
    }

    const buyAllProducts = false

    const allProductsInCart = cart.products

    for (const product of allProductsInCart) {
      await Product.updateOne(
        { _id: product.product },
        { $inc: { stock: product.quantity } }
      )
    }

    cart.products = []

    cart.markModified('products')

    await cart.save()

    return cart

  }

  async updateCart({ id, products }) {
    const cartIndex = this.carts.findIndex(cart => cart.id === id)

    if (cartIndex === -1) { throw new Error(`❌ The cart not found in the database with id ${cid}`) }

    this.carts[cartIndex].products = products
  }

  async getAllCarts() {
    try {
      const carts = await Cart.find().lean()
      if(!carts){
        throw new Error(`❌ The cart not existing in the database`)
      }
      return carts
    } catch (error) {
      next(error)
    }
  }
}
export const cartsService = new CartsService();
import fs from 'node:fs'
import { fsSave } from '../helpers/fsSave.helper.js';
import { v4 as uuid } from 'uuid'

class CartLogic {
  constructor({ path }) {
    this.path = path;
    this.carts = []
    if (fs.existsSync(path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
      } catch (error) {
        console.error('Error reading carts:', error.message)
      }
    }
   }

  async getCartById({ id }) {
    const cart =  this.carts.find((cart) => cart.id === id)
    return cart
  }

  async addCart( products = [] ) {
    const id = uuid()
    const newCart = { id, products}
    this.carts.push(newCart)

    try {
      await fsSave(this.path, this.carts)
      return newCart
    }catch (error) {
      console.error('Error saving cart:', error.message)
      throw new Error('Error saving cart')
    }
  }
  async updateCart({ id, products }) {
    // console.log(id, products)
    const cart = this.carts.find((cart) => cart.id === id)
    if (!cart) {
      console.error(`Cart with ID: ${id} not found`)
      return null
    }

    cart.products = products
    const cartId = this.carts.findIndex(cart => cart.id === id)
    this.carts[cartId] = cart

    try {
      await fsSave(this.path, this.carts)
      return cart
    } catch (error) {
      console.error('Error updating cart:', error.message)
      throw new Error('Error updating cart')     
    }
  }
}

export const cartLogic = new CartLogic({ path: './src/db/carts.json' })
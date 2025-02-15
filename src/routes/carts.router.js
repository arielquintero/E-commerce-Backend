import { Router } from 'express'
import { cartLogic } from '../logic/cart.logic.js'

export const cartsRouter = Router()

// GET CART BY ID => Lista productos en el carrito

cartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params

  try {
    const cart = await cartLogic.getCartById({ id: cid})

    if (!cart) {
      return res.status(404).json({ message: `Cart with ID: ${cid} not found` })
    }
    res.status(200).json(cart.products)
  } catch (error) {
    return res.status(500).json({ message: 'Error accessing cart' })
  }
})

// POST CART => Crea un carrito

cartsRouter.post('/', async (_, res) => {
  try {
    const cart = await cartLogic.addCart({ products:[] })
    res.status(201).json(cart)
  } catch (error) {
    return res.status(500).json({ message: 'Error creating cart' })
  }
})

// POST PRODUCT TO CART => Agrega un producto al carrito

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params

  try {
    const cart = await cartLogic.getCartById({ id: cid })
    if (!cart) {
      return res.status(404).json({ message: `Cart with ID: ${cid} not found` })
    }

    // Incrementando la cantidad de productos si el carrito existe
    const existingProductToCart = cart.products.findIndex(itemPro => itemPro.id === pid)
    if (!existingProductToCart != -1) {
      cart.products[existingProductToCart].quantity++
    } else {
      cart.products.push({ id: pid, quantity: 1 })
    }

    // Actualizando el carrito con el nuevo producto
    const updatedCart = await cartLogic.updateCart({ id: cid, products: cart.products })
    if (!updatedCart) {
      return res.status(404).json({ message: 'Error update cart' })
    }
    res.status(200).json(updatedCart)
  } catch (error) {
    return res.status(500).json({ message: 'Error adding product to cart' })
  }
})
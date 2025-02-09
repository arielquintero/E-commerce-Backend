import { Router } from 'express';
import { cartsService } from '../service/carts.service.js';

export const cartsRouter = Router();

// GET CART BY ID => Lista productos en el carrito
cartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartsService.getCartById({ _id: cid });
    res.status(200).json(cart.products);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// POST CART => Crea un carrito
cartsRouter.post('/', async (_, res) => {
  try {
    const cart = await cartsService.createNewCart();
    res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating cart' });
  }
});

// POST PRODUCT TO CART => Agrega un producto al carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  //const { quantity = 1 } = req.body;

  try {
    const updatedCart = await cartsService.addProductByIdCart({
      cid,
      pid
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const { updatedCart, updatedStock } = await cartsService.updateQuantityProduct(cid, pid, quantity)

    console.log(updatedCart)
    console.log(updatedStock)


    res.status(200).json({
      status : 'success',
      payload: updatedCart,
      stockRemaining: updatedStock 
      })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


})

// ELIMINAR UN PRODUCTO DEL CARRITO
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await cartsService.deleteProductInCart({
      cid,
      pid,
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
cartsRouter.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  
  try {
    await cartsService.deleteAllProductsInCart(cid);
    res.status(200).json({ message: 'Cart empty' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

import { cartsService } from '../service/carts.service.js';


class CartsController {
  constructor(){}

  // Carrito por id
  async getCartById(req, res, next) {
    
    const { cid } = req.params
    
    try {

      const cart = await cartsService.getCartById({ cid })

      const acceptHeader = req.get("Accept")

      if (acceptHeader && acceptHeader.includes("application/json")) {
        return res.status(200).json({
          status : 'success',
          payload: cart.products}
        )
      }

      res.render('cart', { cart })

    } catch (error) {
       next(error) 
    }
  }

  // Carrito nuevo
  async createNewCart(req, res, next){
    try {
    const newCart = await cartsService.createNewCart();

    return res.status(201).json({
      status : 'success',
      payload: newCart }
    )

    } catch (error) {
      next(error) 
    }
  }

  async addProductByIdCart(req, res, next) {

    const { cid, pid } = req.params;
  
    try {
      const updatedCart = await cartsService.addProductByIdCart({
        cid,
        pid
      })

      res.status(200).json({
        status : 'success',
        payload: updatedCart}
      )
    } catch (error) {
      next(error) 
    }
  }

  async updateQuantityProduct(req, res, next) {

    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const updatedCart = await cartsService.updateQuantityProduct(cid, pid, quantity)
  
      res.status(200).json({
        status : 'success',
        payload: updatedCart
        })
  
    } catch (error) {
      next(error)   
    }

  }

  async deleteOneProductInCart(req, res, next) {

    const { cid, pid } = req.params;
    
    try {
      const updatedCart = await cartsService.deleteOneProductInCart({
        cid,
        pid,
      });
      res.status(200).json({
        status : 'success',
        payload: updatedCart}
      )
    } catch (error) {
      next(error) 
    }
  }

  async deleteAllProductsInCart(req, res, next) {
    const { cid } = req.params;
  
    try {
      await cartsService.deleteAllProductsInCart({ cid });
      res.status(200).json({
        status : 'success', 
        message: 'Cart empty'}
      )
    } catch (error) {
      next(error) 
    }
  }

  async getAllCarts(req, res, next) {
    try {

      const carts = await cartsService.getAllCarts()

      res.status(200).json({
        status: "success",
        payload: carts
      });
    } catch (error) {
      next(error)
    }
  }
}

export const cartsController = new CartsController()
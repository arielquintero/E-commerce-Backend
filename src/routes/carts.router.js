import { Router } from 'express'
import { cartsController } from '../controllers/carts.controller.js'

const cartsRouter = Router();



cartsRouter.get('/:cid', cartsController.getCartById)

cartsRouter.post('/', cartsController.createNewCart)

cartsRouter.post('/:cid/products/:pid', cartsController.addProductByIdCart)

cartsRouter.put('/:cid/products/:pid', cartsController.updateQuantityProduct)

cartsRouter.delete('/:cid/products/:pid', cartsController.deleteOneProductInCart);

cartsRouter.delete('/:cid', cartsController.deleteAllProductsInCart)


export { cartsRouter }
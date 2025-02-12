import { Router } from 'express'
import { productsController } from '../controllers/products.controller.js';
import { cartsController } from '../controllers/carts.controller.js';

const viewsRouter = Router()


// RENDERIZAMOS LA PLANTILLA DE HOME CON LOS PRODUCTOS
viewsRouter.get('/', async(req, res, next) => {

  try {
    await productsController.getAllProductsForQuery(req, res, next)
  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/product/:id', async (req, res, next) => {
    try {
        await productsController.getProductById(req, res, next);
    } catch (error) {
        next(error);
    }
})

viewsRouter.get('/carts/all', cartsController.getAllCarts)
viewsRouter.post('/carts/', cartsController.createNewCart)
viewsRouter.put('/carts/:cid/products/:pid', cartsController.updateQuantityProduct)
viewsRouter.delete('/carts/:cid/products/:pid', cartsController.deleteOneProductInCart)
viewsRouter.delete('/carts/:cid', cartsController.deleteAllProductsInCart);

viewsRouter.get('/carts/:cid', async (req, res, next) => {
  try {
    
    await cartsController.getCartById(req, res, next)

  } catch (error) {
    next(error)
  }
})

viewsRouter.post('/carts/:cid/products/:pid', async (req, res, next) => {
  try {
    await cartsController.addProductByIdCart(req, res, next)
    } catch (error) {
      next(error)
    }
})

viewsRouter.get('/realtimeproducts', (_, res) => {
  // AQUI MI ARCHIVO HBS DEBE DE LLAMARSE IGUAL QUE COMO ESTA EN VIEWS
  // OSEA realTimeProducts Y NO realtimeproducts
  res.render('realTimeProducts');
})

export { viewsRouter }

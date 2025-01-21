import { Router } from 'express'
import { productsLogic } from '../logic/products.logic.js';

const viewsRouter = Router()

const products = await productsLogic.getAllProducts();

// RENDERIZAMOS LA PLANTILLA DE HOME CON LOS PRODUCTOS
viewsRouter.get('/', async(_, res) => {
  try {
    const products = await productsLogic.getAllProducts();
    res.render('home', { products });
  } catch (error) {
    console.error('Error loading products: ', error)
    res.status(500).send('Error loading products')
  }
});

viewsRouter.get('/realtimeproducts', (_, res) => {
  // AQUI MI ARCHIVO HBS DEBE DE LLAMARSE IGUAL QUE COMO ESTA EN VIEWS
  // OSEA realTimeProducts Y NO realtimeproducts
  res.render('realTimeProducts');
})

/**
 * SIEMPRE EN res.render() SE DEBE DE PASAR EL NOMBRE DEL ARCHIVO HBS
 * TAL CUAL COMO ESTA EN LA CARPETA VIEWS
 */

export { viewsRouter, products}
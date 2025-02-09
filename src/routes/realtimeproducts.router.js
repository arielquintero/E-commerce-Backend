import { Router } from 'express';
//import { getRealTimeProducts, postRealTimeProducts } from '../controllers/realtimeproducts.controller.js';
import { io } from '../../server.js';
import { productsService } from '../service/products.service.js';

//export const realTimeProductsRouter = Router();

// realTimeProductsRouter.get('/', getRealTimeProducts);
// realTimeProductsRouter.post('/', postRealTimeProducts)

export const realTimeProductsRouter = (io) => { // Recibir io como parámetro
    const router = Router();

    router.get('/', async (_, res) => {
      const products = await productsService.getAllProducts();
      console.log(products)
      res.json(products);
    })

    router.post('/', async (req, res) => {
        try {
            const newProduct = await productsService.createProduct(req.body);
            if (!newProduct) {
                return res.status(400).json({ error: 'Error al agregar producto' });
            }

            io.emit('new-product', newProduct); // Usar la instancia de io pasada
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};
/*
realTimeProductsRouter.get('/', async (_, res) => {
  const products = await productsService.getAllProducts();
  console.log(products)
  res.json(products);
})

realTimeProductsRouter.post('/', async (req, res) => {
  //const {name, description, code, price, stock} = req.body;
  
  //newProduct.push(newProduct)
  try {
    const newProduct = await productsService.createProduct(req.body);
    if (!newProduct) {
      return res.status(400).json({ error: 'Faild to add product'});
    }
    
    io.emit('new-product', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product: ', error.meessage);
    res.status(500).json({ error: 'Internal server errror'});
  }
});
*/





// realTimeProductsRouter.post('/', async (req, res) => {
//   //const {name, description, code, price, stock} = req.body;
  
//   const newProduct = await productsLogic.addProduct(req.body);
//   //newProduct.push(newProduct)

//   io.emit('new-product', newProduct);

//   res.status(201).json(newProduct);
// })

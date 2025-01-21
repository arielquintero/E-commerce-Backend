import { Router } from 'express';
import { io } from '../../server.js';
import { productsLogic } from '../logic/products.logic.js';

export const realTimeProductsRouter = Router();

realTimeProductsRouter.get('/', (_, res) => {
  const products = productsLogic.getAllProducts();
  res.json(products);
})

realTimeProductsRouter.post('/', async (req, res) => {
  //const {name, description, code, price, stock} = req.body;
  
  //newProduct.push(newProduct)
  try {
    const newProduct = await productsLogic.addProduct(req.body);
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

// realTimeProductsRouter.post('/', async (req, res) => {
//   //const {name, description, code, price, stock} = req.body;
  
//   const newProduct = await productsLogic.addProduct(req.body);
//   //newProduct.push(newProduct)

//   io.emit('new-product', newProduct);

//   res.status(201).json(newProduct);
// })
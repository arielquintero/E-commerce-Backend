import express from 'express';
import { productsRouter } from './src/routes/products.router.js';
import { cartsRouter } from './src/routes/carts.router.js';
import path from 'path';
import { __dirname } from './src/helpers/dirname.helper.js';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/public')));

// RUTAS DEL CRUD DE PRODUCTOS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);









// app.get('/api/products', (req, res) => {
//   const products = productsLogic.getAllProducts()
//   res.status(200).json(products)
// })

// app.get('/api/products/:id', async (req, res) => {
//   const { id } = req.params
//   const product = await productsLogic.getProductById({ id })

//   if(!product){
//     return res.status(404).json({message: 'Product not found'})
//   }

//   res.status(200).json(product)
// })

// app.post('/api/products', async (req, res) => {
//   const {title, description, code, price, status = true, stock, category, thumbnails} = req.body
//   console.log(req.body)
//   try {
//     const product = await productsLogic.addProduct({title, description, code, price, status, stock, category, thumbnails})
//     res.status(201).json(product)
//   } catch (error) {
//     res.status(500).json({message: 'Internal server error'})
//   }
// })

// app.put('/api/products/:id', async (req, res) => {
//   const {id} = req.params
//   const {title, description, code, price, status, stock, category, thumbnails} = req.body
//   try {
//     const product = await productsLogic.update({id, title, description, code, price, status, stock, category, thumbnails})

//     if(!product){
//       return res.status(404).json({message: 'Product not found'})
//     }
//   } catch (error) {
//     res.status(500).json({message: 'Internal server error'})
//   }
// })

// app.delete('/api/products/:id', async (req, res) => {
//   const {id} = req.params

//   try {
//     const product = await productsLogic.delete({id})

//     if(!product){
//       return res.status(404).json({message: 'Product not found'})
//     }
//     res.status(200).json({product})
//   } catch (error) {
//     res.status(500).json({message: 'Internal server error'})
//   }
// })
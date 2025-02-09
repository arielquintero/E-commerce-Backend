import { io } from '../../server.js';
import { productsService } from "../service/products.service.js";


async function getRealTimeProducts(_, res) {
  const products = await productsService.getAllProducts();
  console.log(products)
  res.json(products);
}

async function postRealTimeProducts(req, res) {
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
};

export { getRealTimeProducts, postRealTimeProducts }
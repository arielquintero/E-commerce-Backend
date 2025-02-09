import { productsService } from '../service/products.service.js';
//import { product } from '../models/product.model.js';

class ProductsController {

  constructor() {}

  async getAllProducts(_, res) {
    try {
      const products = await productsService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message }); // Envía el mensaje de error del servicio
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    
    const product = await productsService.getProductById({ _id: id });
  
    if (!product) {
      return res.status(404).json({ message: `Product not found for ID: ${id}` });
    }
  
    res.status(200).json(product);
  }

  async createProduct(req, res) {
    const newData = req.body;
    try {
      const createdProduct = await productsService.createProduct(newData);
      return res.status(201).json(createdProduct);
    } catch (error) {
      // Capturamos el error y enviamos un mensaje adecuado
      if (error.message.includes("El código") || error.message.includes("El título")) {
        res.status(400).json({ message: error.message }); // Error de validación
      } else {
        res.status(500).json({ message: "Internal server error" }); // Error del servidor
      }
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const fieldProduct = req.body;
    
    try {
      const updatedProduct = await productsService.update(id, fieldProduct);
      if (!updatedProduct) {
        return res.status(404).json({ message: `Product with ID: ${id} not found` });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      // Capturamos el error y enviamos un mensaje adecuado
      if (error.message.includes("El código") || error.message.includes("El título")) {
        res.status(400).json({ message: error.message }); // Error de validación
      } else if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message }); // Producto no encontrado
      } else {
        res.status(500).json({ message: "Internal server error" }); // Error del servidor
      }
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      console.log('ID:', id);
      const product = await productsService.delete(id);
      res.status(200).json({ message: "Product deleted successfully", product });
      //res.status(404).json({ message: `Product with ID: ${id} not found` });
  
    } catch (error) {
      (error.message.includes("not found"))
      ? res.status(404).json({ message: error.message })
      : res.status(500).json({ message: "Error deleting product" })
    }
  }
}

export const productsController = new ProductsController();
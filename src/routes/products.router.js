import { Router } from 'express'
//import { productsService } from '../service/products.service.js'
import { productsController } from '../controllers/products.controller.js';
//import { checkMissingFields } from '../helpers/index.js'
//import { product } from '../models/product.model.js'

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

export  { productsRouter };

/*

// GET ALL PRODUCTS
productsRouter.get("/", async (_, res) => {
  const products = await productsService.getAllProducts();
  res.status(200).json(products);
});

// GET PRODUCT BY ID
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: `Product not found for ID: ${id}` });
  }

  res.status(200).json(product);
});

// POST PRODUCT
productsRouter.post("/", async (req, res) => {
  const data = req.body;

  // const requiredFields = product.getRequiredField();
  // const optionalFields = ["thumbnails"];

  // const missingFieldsMessage = checkMissingFields(req.body, requiredFields, optionalFields);
  // if (missingFieldsMessage) {
  //   return res.status(400).json({ message: missingFieldsMessage });
  // }

  try {
    const newData = await productsService.createProduct(data);
    res.status(201).json(newData);
  } catch (error) {
    // Capturamos el error y enviamos un mensaje adecuado
    if (error.message.includes("El código") || error.message.includes("El título")) {
      res.status(400).json({ message: error.message }); // Error de validación
    } else {
      res.status(500).json({ message: "Internal server error" }); // Error del servidor
    }
  }
});

// PUT PRODUCT
productsRouter.put("/:id", async (req, res) => {
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
});

// DELETE PRODUCT
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: `Product with ID: ${id} not found` });
    }
    const product = await productsService.delete({ id });

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

*/
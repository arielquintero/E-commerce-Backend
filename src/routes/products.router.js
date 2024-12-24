import { Router } from 'express'
import { productsLogic } from '../logic/products.logic.js'
import { checkMissingFields } from '../helpers/check.helper.js'
import { ProductModels } from '../models/product.model.js'

export const productsRouter = Router();

// GET ALL PRODUCTS
productsRouter.get("/", async (req, res) => {
  const products = await productsLogic.getAllProducts();
  res.status(200).json(products);
});

// GET PRODUCT BY ID
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await productsLogic.getProductById({ id });

  if (!product) {
    return res.status(404).json({ message: `Product not found for ID: ${id}` });
  }

  res.status(200).json(product);
});

// POST PRODUCT
productsRouter.post("/", async (req, res) => {
  const { title, description, code, price, status = true, stock, category } = req.body;

  const requiredFields = ProductModels.getRequiredField();
  const optionalFields = ["thumbnails"];

  const missingFieldsMessage = checkMissingFields(req.body, requiredFields, optionalFields);
  if (missingFieldsMessage) {
    return res.status(400).json({ message: missingFieldsMessage });
  }

  try {
    const product = await productsLogic.addProduct({ title, description, code, price, status, stock, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT PRODUCT
productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, code, price, status, stock, category } = req.body;

  try {
    const product = await productsLogic.update({ id, title, description, code, price, status, stock, category });

    if (!product) {
      return res.status(404).json({ message: `Product with ID: ${id} not found` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE PRODUCT
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsLogic.delete({ id });

    if (!product) {
      return res.status(404).json({ message: `Product with ID: ${id} not found` });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});














// import { Router } from "express";
// import { productsLogic } from "../logic/product.logic.js";
// import { checkMissingFields } from "../helpers/check.helper.js";
// import { ProductModels } from "../models/product.model.js";

// export const porductsRouter = Router();


// // GET ALL PRODUCTS

// porductsRouter.get("/", async (req, res) => {
//   const products = await productsLogic.getAllProducts();
//   res.status(200).json(products);
// })

// // GET PRODUCT BY ID

// porductsRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
  
//   const product = await productsLogic.getProductById({ id });

//   if (!product) {
//     return res.status(404).json({ message: "Product not found ID invalide" });
//   }

//   res.status(200).json(product);
// })

// // POST PRODUCT

// porductsRouter.post('/api/products', async (req, res) => {
//   const {title, description, code, price, status = true, stock, category} = req.body
//   console.log(req.body)
//   try {
//     const product = await productsLogic.addProduct({title, description, code, price, status, stock, category})
//     res.status(201).json(product)
//   } catch (error) {
//     res.status(500).json({message: 'Internal server error'})
//   }
// })

// // PUT PRODUCT

// porductsRouter.put('/api/products/:id', async (req, res) => {
//   const {id} = req.params
//   const {title, description, code, price, status, stock, category} = req.body
//   try {
//     const product = await productsLogic.update({id, title, description, code, price, status, stock, category})

//     if(!product){
//       return res.status(404).json({message: 'Product not found'})
//     }
//   } catch (error) {
//     res.status(500).json({message: 'Internal server error'})
//   }
// })

// // DELETE PRODUCT

// porductsRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await productsLogic.delete({ id }); 

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ product });
//   } catch (error) {
//     res.status(500).json({ message: 'Error delete product' });
//   }
// })
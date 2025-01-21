import fs from 'node:fs';  
import { ProductModels } from '../models/product.model.js';
import { fsSave, checkMissingFields, existingId } from '../helpers/index.js';

class ProductsLogic {
  constructor({ path }) {
    this.path = path;
    this.products = [];

    if (fs.existsSync(path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        console.error("Error reading products file:", error.message);
      }
    }
  }

  async addProduct(payload) {
    const requiredFields = ProductModels.getRequiredField();
    const optionalFields = ["thumbnails"];
    const messageErrorMissingField = checkMissingFields(payload, requiredFields, optionalFields);

    if (messageErrorMissingField) {
      console.error(messageErrorMissingField);
      return null;
    }

    const { price, stock, code } = payload;

    const existingCodeProduct = this.products.find(product => product.code === code)
    if (existingCodeProduct){
      console.error(`The product with code ${code} already exists`)
      return null
    }

    if ( !Number.isFinite(price) || price <= 0 ) {
      console.error("The price must be a valid number greater than 0");
      return null;
    }
    if ( !Number.isFinite(stock) || stock <= 0) {
      console.error("The stock must be a valid number greater than 0");
      return null;
    }

    const product = new ProductModels(payload);
    if (existingId(this.products, product.id)) {
      return null;
    }

    this.products.push(product);

    try {
      await fsSave(this.path, this.products);
      return product;
    } catch (error) {
      console.error("Error saving product:", error.message);
      return null;
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById({ id }) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error(`Product with ID: ${id} not found`);
      return null;
    }
    return product;
  }

  async update(payload) {
    const { id } = payload;
    const product = this.getProductById({ id });

    if (!product) {
      console.error("Product not found");
      return null;
    }

    Object.assign(product, payload);

    try {
      await fsSave(this.path, this.products);
      return product;
    } catch (error) {
      console.error("Error updating product:", error.message);
      return null;
    }
  }

  async delete({ id }) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      console.error("Product not found");
      return null;
    }

    const deletedProduct = this.products.splice(index, 1)[0];

    try {
      await fsSave(this.path, this.products);
      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return null;
    }
  }
}
export const productsLogic = new ProductsLogic({ path: "./src/db/products.json" });


// import fs from 'node:fs';  
// import { ProductModels } from '../models/product.model.js';
// import { fsSave } from '../helpers/fsSave.helper.js';
// import { checkMissingFields } from '../helpers/check.helper.js';
// import { existingId } from '../helpers/existingId.helper.js';


// class ProductsLogic {
//   constructor({ path }) {
//     this.path = path;
//     this.products = [];

//     if (fs.existsSync(path)) {
//       try {
//         this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       } catch (error) {
//         console.error("Error reading products file:", error.message);
//       }
//     }
//   }

//   async addProduct(payload) {
//     const requiredFields = ProductModels.getRequiredField();
//     const optionalFields = ["thumbnails"];
//     const messageErrorMissingField = checkMissingFields(payload, requiredFields, optionalFields);

//     if (messageErrorMissingField) {
//       console.error(messageErrorMissingField);
//       return null;
//     }

//     const { price, stock, code } = payload;

//     // VALIDAMOS EL CODIGO COMO UNICO
//     const existingCodeProduct = this.products.find(product => product.code === code)
//     if (existingCodeProduct) {
//       console.error(`The product with code ${code} already exists`)
//       return null
//       }
    
//     // VELIDAMOS EL PRECIO Y STOCK 
//     //if (price <= 0 || isNaN(price)) {
//     if (!Number.isFinite(price) || price <= 0) {
//       console.error("The price must be a valid number greater than 0");
//       return null
//       }
  
//     if (stock <= 0 || isNaN(stock)) {
//       console.error("The stock must be a valid number greater than 0");
//       return null
//       }

//     // CREAMOS UNA NUEVA INSTANCIA DE PRODUCT
//     const product = new ProductModels(payload);
    
//     if (existingId(this.products, product.id)){ 
//       console.error("Product ID already exists");
//       return null;
//       };
    
//     // AGREGAMOS EL NUEVO PRODUCTO A LA LISTA
//     this.products.push(product);

//     // SAVE 
//     try {
//       await fsSave(this.path, this.products);
//       return product;
//     } catch (error) {
//       console.error("Error saving product:", error.message);
//       return null;
//     }
//   }

//   getAllProducts() {
//     return this.products;
//   }

//   getProductById({ id }) {
//     const product = this.products.find((product) => product.id === id);

//     if (!product){
//       console.error(`Product with ID: ${id} not found`);
//       return null;
//       }
//     return product;
//   }

//   async update(payload) {
//     const { id } = payload;
//     const product = this.getProductById({ id });

//     if (!product) {
//       console.error("Product not found");
//       return null;
//       }

//     Object.assign(product, payload);

//     try {
//       await fsSave(this.path, this.products);
//       return product;
//     } catch (error) {
//       console.error("Error updating product:", error.message);
//       return null;
//     }
//   }

//   async delete({ id }) {
//     const index = this.products.findIndex((product) => product.id === id);

//     if (index === -1) {
//       console.error("Product not found");
//       return null;
//       }

//     const deletedProduct = this.products.splice(index, 1)[0];

//     try {
//       await fsSave(this.path, this.products);
//       return deletedProduct;
//     } catch (error) {
//       console.error("Error deleting product:", error.message);
//       return null;
//     }
//   }
// }
// export const productsLogic = new ProductsLogic({ path: 'src/db/products.json' });







// // class ProductsLogic {

// //   path
// //   products = []

// //    constructor({ path }) {
// //     this.path = path;
// //     if (fs.existsSync(path)) {
// //       try {
// //         this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
// //       } catch (error) {
// //         console.error("Error reading products:", error);
// //         this.products = [];
// //       }
// //     } else {
// //       this.products = [];
// //     }
// //   }

// //   async addProduct(payload) {
// //     let {title, description, code, price, status = true, stock, category} = payload
    
// //     const requiredFields = ProductModels.getRequiredField()
// //     const optionalFields = ['thumbnails']

// //     const messageErrorMissingField = checkMissingFields(payload,requiredFields, optionalFields)
// //     if (messageErrorMissingField !== null){
// //       console.error(messageErrorMissingField)
// //       return
// //     }
   
// //     if(isNaN(Number(price))){
// //       console.error('The price must be a number');
// //       return
// //     } else if (price < 0){
// //       console.log('The price must be greater than 0')
// //       return
// //     }
  
// //     if (isNaN(Number(stock))){
// //       console.error('The stock must be a number');
// //       return
// //     } else if (stock <= 0){
// //       console.log('The stock must be different from 0')
// //       return
// //     }
    
// //     const product = new ProductModels(title, description, code, price, status, stock, category)

// //     existingId(this.products)

// //     this.products.push(product)
// //     try {
// //       await fsSave(this.path, this.products)
// //       return product
// //     } catch (error) {
// //       console.error('Error on save product', error);
// //     }
// //   }
// //   getAllProducts() {
// //     return this.products
// //   }

// //   getProductById({id}) {
// //     console.log(this.products);
    
// //     const product = this.products.find(product => product.id === id)
// //     return product
// //   }

// //   async update(payload) {
// //     let {id, title, description, code, price, status = true, stock, category} = payload
// //     const product = this.products.find(product => product.id === id)

// //     if(!product){
// //       return null
// //     }

// //     product.title = title ?? product.title
// //     product.description = description ?? product.description
// //     product.code = code ?? product.code
// //     product.price = price ?? product.price
// //     product.status = status ?? product.status
// //     product.stock = stock ?? product.stock
// //     product.category = category ?? product.category

// //     const indexId = this.products.findIndex(product => product.id === id)

// //     this.products[indexId] = product

// //     try {
// //       await fsSave(this.path, this.products)
// //       return product
// //     } catch (error) {
// //       console.error('Error on update product: ', error);
// //     }
// //   }
// //   async delete({id}) {
// //     const product = this.products.find(product => product.id === id)

// //     if(!product){
// //       return null
// //     }

// //     const indexId = this.products.findIndex(product => product.id === id)
// //     this.products.splice(indexId, 1)
// //     try {
// //       await fsSave(this.path, product)
// //       return product
// //     } catch (error) {
// //       console.error('Error on delete product: ', error);
// //     }
// //   }

// // }

// // export const productsLogic = new ProductsLogic({path: './src/db/products.json'});

// // productsLogic.addProduct({
// //     "title": "Nuevo Producto",
// //     "description": "Descripción del nuevo producto",
// //     "code": "COD456",
// //     "price": 999,
// //     "stock":20,
// //     "status": true,
// //     "category": "varios",
// //     "thumbnails": ["imagen2.jpg", "imagen3.png"]
// // });

// // console.log(productsLogic.getAllProducts())
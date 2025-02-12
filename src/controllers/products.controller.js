import { productsService } from '../service/products.service.js';

class ProductsController {

  constructor() { }

  async getAllProductsForQuery(req, res, next) {

    try {

      if (req) {

        const { limit = 10, page = 1, sort, category, status = "true" } = req.query

        const options = {
          limit: parseInt(limit, 10),
          page: parseInt(page, 10),
          sort: {
            price: sort === 'preAsc' ? 1 : -1
          },
          lean: true
        }

        if (isNaN(options.page) || options.page < 1) {
          throw new Error('The number page must be a positive')
        }

        let filter = {}
        if (status !== undefined && status !== '') {
          filter.status = (status === 'true');
        }

        if (category) filter.category = category


        if (sort === 'preAsc') {
          options.sort = { price: 1 }
        } else if (sort === 'preDesc') {
          options.sort = { price: -1 }
        }

        const isAvailable = (status === undefined || status === '' || status === 'true');

        const products = await productsService.getAllProductsForQuery(filter, options)

        // Creamos un arreglo con los números de página para la vista
        const pageNumbers = [];
        for (let i = 1; i <= products.totalPages; i++) {
          pageNumbers.push({
            page: i,
            isCurrent: i === products.page
          });
        }
        if (typeof products !== 'object') {
          throw new Error('The service returned an invalid value');
        }
        const pagination = {
          totalDocs: products.totalDocs,
          limit: products.limit,
          totalPages: products.totalPages,
          page: products.page,
          pagingCounter: products.pagingCounter,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          pageNumbers: pageNumbers
        }

        // Renderizamos la vista y pasamos los datos necesarios para Handlebars
        res.render('home', {
          products: products.docs,
          pagination,
          limit,
          category,
          sort,
          status,
          isAvailable
        })

      } else {
        // /realtimeproducts por websocket
      }

    } catch (error) {
      next(error)
    }
  }

  async getAllProducts(_, res, next) {
    try {
      const products = await productsService.getAllProducts()

      if (req.accepts('html')) {
        return res.render('product', { products })
      } else {
        return res.status(200).json({ success: true, payload: products })
      }

    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params;
    console.log(typeof req.params.id)
    console.log(req.params.id);
    try {
      const product = await productsService.getProductById({ id })

      if (!product) { return res.status(404).json({ message: `The product not found for ID: ${id}` }) }


      if (req.accepts('html')) {
        return res.render('product', { product })
      } else {
        return res.status(200).json({ success: true, payload: product })
      }

    } catch (error) {
      next(error)
    }
  }

  async createProduct(req, res, next) {
    const newData = req.body;
    try {
      const createdProduct = await productsService.createProduct(newData)
      return res.status(201).json(createdProduct)
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params
    const fieldProduct = req.body

    try {
      const updatedProduct = await productsService.update(id, fieldProduct)
      if (!updatedProduct) {
        return res.status(404).json({ message: `The product with ID: ${id} not found` })
      }
      res.status(200).json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const product = await productsService.delete({ id })
      res.status(200).json({ message: "The product deleted successfully", product })
    } catch (error) {
      next(error)
    }
  }
}

export const productsController = new ProductsController()
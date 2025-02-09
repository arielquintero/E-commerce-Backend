import { Router } from 'express'
//import { productsService } from '../service/products.service.js';
import { Product } from '../models/product.model.js';

const viewsRouter = Router()

//const products = await productsLogic.getAllProducts();

// RENDERIZAMOS LA PLANTILLA DE HOME CON LOS PRODUCTOS
viewsRouter.get('/', async(req, res) => {
  const { page = 1, limit = 10, category, sort } = req.query;
  const query = {};

  if (category && category.trim() !== '') {
    query.category = category.trim();
  }

  // if (category) {
  //   query.category = category;
  // }
  const options = {
    page: Number(page),
    limit: Number(limit),
    sort: {}
  }

  if (sort === 'preAsc') {
    options.sort.price = 1; // Ascendente
  } else if (sort === 'preDesc') {
    options.sort.price = -1; // Descendente
  }

  try {
      const products = await Product.paginate(
        // {},
        // { page: Number(page), limit: Number(limit) }
        query, options
      );

      // Obtener categorías únicas
      const categories = await Product.distinct('category');
      console.log(categories);
      const categoriesWithSelection = categories.map((cat) => ({
        name: cat,
        isSelected: cat === category, // true si es la categoría seleccionada
      }));

      
      // Generar números de página
      const totalPages = products.totalPages;
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push({ page: i, isCurrent: i === products.page });
      }

      res.render('home', {
        products: {
          ...products,
          pageNumbers
        },
        limit,
        categories: categoriesWithSelection,
        category,
        sort,
        sortAsc: sort === 'preAsc', // true si el orden es ascendente
        sortDesc: sort === 'preDesc', // true si el orden es descendente
    });
      //res.render('home', { products });
    //const products = await productsService.getAllProducts();
    //console.log(products);
    //res.render('home', { products, limit });
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

//export { viewsRouter, products}
export { viewsRouter }

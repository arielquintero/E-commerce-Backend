<h1><img src="https://img.shields.io/badge/E--COMMERCE-BACKEND-blue?labelColor=gray&style=plastic" height='36' alt="E-COMMERCE" /></h1>


> Programación Backend I --- Desarrollo Avanzado de Backend

* Alumno: Ariel Quintero
* Profesor Titular: Emiliano Perez
* Tutora: Paola Silvina Coronel

> Comisión: 76070

<h3> Primera Pre-Entrega Lógica CRUD</h3>

Diseño de un servidor que realiza la logica de administracion de un e-commerce,
donde se gestionan productos y carritos.

- [X] La logica de gestion de productos y carritos con getAllProducts, getProductById, addProducts, updateProduct, deleteProduct
<spam>(GET / PUT / POST / DELETE)</spam>

<h3> Segunda Pre-Entrega Lógica CRUD mas Websocket y Handlebars </h3>

- [X] Se integro el uso del motor de plantillas Handlebars para renderizar las vistas tanto de home.hbs y realTimeProducts.hbs.
- [X] Se integro tambien el uso de Websocket logrando actualizar crear y eliminar en tiempo real productos de un istados de productos provenientes del products.json.
- [X] Utilizamos el midleware morgan para facilitar la vista de la peticiones por la terminal.
- [X] Para dar estilos use Bulma.
- [X] Se creo un pequeño navbar para moverse entre home y realtimeproducts.

<h3> Entrega Final E-commerce CRUD Express Handlebars MongoDB </h3>

- [X] Mongo Atlas - Mongo Compass - Mongoose - Mongoose Paginate V2.
- [X] Uso de Filtros para seleccionar categoría, paginación, posibilidad de 
     ordenar el precio por ascendente y descendente, pleado query params.
- [X] Gestión del carrito implementando métodos de <strong>populate</strong>, que permiten hacer referencia a la colección <strong>products</strong>, lo que permite completar partes de un subdocumento.
    
    - <strong>Funcionalidad agregada a la vista de cart.hhb:</strong>
        Es posible incrementar la cantidad de un producto y descontarla del stock existente en la colección de productos. De igual manera, al decrementar la cantidad, esta se actualiza en la base de datos. En caso de eliminar un producto o vaciar el carrito, el stock se restablece.

- [X] Las vistas se generan utilizando Handlebars. Desde la página principal (home), tienes la opción de cargar un carrito existente o crear hasta tres nuevos. Una vez seleccionado, tendremos la posibilidad de añadir los productos al carrito.
- [X] En la vista de producto, podemos ver los detalles del producto y tenemos la opción de agregar el producto al carrito o ver el carrito.

### Herramientas empleadas 
<img src="https://img.shields.io/badge/Node-gren" /> <img src="https://img.shields.io/badge/Express-red" /> <img src="https://img.shields.io/badge/Mongoose-gren" /> <img src="https://img.shields.io/badge/Mongo%20Atlas-gren" /> <img src="https://img.shields.io/badge/Mongo%20Compass-black" /> <img src="https://img.shields.io/badge/MongoDB-grey" /> <img src="https://img.shields.io/badge/Handlebars-blue" /> <img src="https://img.shields.io/badge/Bulma-pink" /> <img src="https://img.shields.io/badge/Javascript-yellow" />






         

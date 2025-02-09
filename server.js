import express from 'express';
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import handlebars from 'express-handlebars'
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { connectedMongoDB } from './src/config/db.js';
import { Product } from './src/models/product.model.js';
import { productsRouter, cartsRouter, viewsRouter, realTimeProductsRouter } from './src/routes/index.js';
//import { productsRouter, cartsRouter, viewsRouter, products, realTimeProductsRouter } from './src/routes/index.js';
import { Server } from 'socket.io';
import { __dirname } from './dirname.js';
import { error } from 'console';


const app = express();
const PORT = 5000;



const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// LUEGO inicializar Socket.IO, usando la instancia del servidor
export const io = new Server(server);  // No es necesario exportar



// Obtener productos UNA VEZ, fuera del manejador de conexión
let initialProducts;
connectedMongoDB().then(() => {
    return Product.find();
}).then(products => {
    initialProducts = products;
}).catch(error => {
    console.error('Error al cargar productos iniciales:', error.message);
    // Manejar el error apropiadamente, quizás salir del proceso
    process.exit(1); // Ejemplo: Salir si la carga inicial de datos falla
});

// CONFIGURACIÓN DE SOCKET.IO
io.on('connection', (socket) => {
    console.log(`Nuevo cliente socket conectado: ${socket.id}`);

    if (initialProducts) {
        socket.emit('init', initialProducts);
    } else {
        socket.emit('error', 'Productos aún no cargados'); // O manejar de otra forma
    }

    socket.on('disconnect', (reason) => {
        console.log(`Cliente desconectado: ${socket.id} (Razón: ${reason})`);
    });
});


// CONFIG EXPRESS
app.use(morgan('dev'));
//app.use(morgan('start'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// CONFIG HANDLEBARS
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'src/views'));
//console.log('Ruta de vistas configurada:', app.get('views'));
//console.log('__dirname:', __dirname);


// RUTAS DEL CRUD DE PRODUCTOS
//app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
// RUTAS PARA WEBSOCKET
app.use('/', viewsRouter);
app.use('/realtimeproducts', realTimeProductsRouter)

/*
// CONFIG SOCKET
export const io = new Server(server);

io.on('connection', async (socket) => {
  connectedMongoDB();
  console.log(`New client socket connected: ${socket.id}`);
  product.find().then((products) => {
    socket.emit('init', products);
  }).catch(error => {
    console.error('Error loading products: ', error)
    socket.emit('error', 'Error loading products')
  });
  socket.on('disconnect', (reason) => {
    console.log(`Client disconneted: ${socket.io} (Reason: ${reason})`)
  })
});
*/
/*
export const io = new Server(server);

io.on('connection', async (socket) => {
  console.log(`New client socket connected: ${socket.id}`);
  const products = await product.find();

  socket.emit('init', products);

  socket.on('disconnect', (reason) => {
    console.log(`Client disconneted: ${socket.io} (Reason: ${reason})`)
  })
});
*/
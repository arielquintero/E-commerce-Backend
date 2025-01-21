import express from 'express';
import handlebars from 'express-handlebars'
import path from 'path';
import morgan from 'morgan';
import { productsRouter, cartsRouter, viewsRouter, products, realTimeProductsRouter } from './src/routes/index.js';
import { Server } from 'socket.io';
import { __dirname } from './dirname.js';


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// CONFIG EXPRESS
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// CONFIG HANDLEBARS
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'src/views'));
//console.log('Ruta de vistas configurada:', app.get('views'));
//console.log('__dirname:', __dirname);


// RUTAS DEL CRUD DE PRODUCTOS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// RUTAS PARA WEBSOCKET
app.use('/', viewsRouter);
app.use('/realtimeproducts', realTimeProductsRouter)


// CONFIG SOCKET
export const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`New client socket connected: ${socket.id}`);

  socket.emit('init', products);

  socket.on('disconnect', (reason) => {
    console.log(`Client disconneted: ${socket.io} (Reason: ${reason})`)
  })
});
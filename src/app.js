import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import appRouter from './routers/index.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';
import SalaEsperaController from './controllers/sala-espera.controller.js';
import SalaEsperaService from './services/sala-espera.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const salaEsperaController = new SalaEsperaController(new SalaEsperaService());

io.on('connection', (socket) => {
    console.log('Cliente conectado: ', socket.id);
    salaEsperaController.SalaEsperaSocketHandler(socket);
});

app.use(express.json());
app.use(appRouter);
app.use(errorConverter);
app.use(errorHandler);

export { app, server, io };
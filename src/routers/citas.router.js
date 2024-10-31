import express from 'express';
import CitasController from '../controllers/citas.controller.js';
import CustomContainer from '../container/custom-container.js';

const container = CustomContainer.getInstance();
const citasController = container.get(CitasController.name);

const citasRouter = express.Router();

citasRouter.route('/citas')
    .get(citasController.obtenerCitas)

citasRouter.route('/citas/crear')
    .post(citasController.crearCita);



citasRouter.get('/citas/:id', citasController.obtenerCita);
citasRouter.put('/citas/:id/colocar-en-espera', citasController.colocarEnEspera);
citasRouter.put('/citas/:id/cancelar', citasController.cancelarCita);
citasRouter.put('/citas/:id/confirmar', citasController.confirmarCita);
citasRouter.put('/citas/:id/iniciar', citasController.iniciarCita);
citasRouter.put('/citas/:id/finalizar', citasController.finalizarCita);

export default citasRouter;
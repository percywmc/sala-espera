import { catchAsync } from '../utils/controllers.util.js';

class CitasController{

    constructor(citasService){
        this.citasService = citasService;
    }

    crearCita = catchAsync(async (req, res) => {
        const { body } = req;
        const cita = await this.citasService.crearCita(body);
        res.status(201).json(cita);
    });

    obtenerCitas = catchAsync(async (req, res) => {
        const citas = await this.citasService.obtenerCitas();
        res.status(200).json(citas);
    });

    obtenerCita = catchAsync(async (req, res) => {
        const { id } = req.params;
        const cita = await this.citasService.obtenerCita(id);
        res.status(200).json(cita);
    });

    colocarEnEspera = catchAsync(async (req, res) => {
        const { id } = req.params;
        await this.citasService.colocarEnEspera(id);
        res.status(204).send();
    });

    cancelarCita = catchAsync(async (req, res) => {
        const { id } = req.params;
        await this.citasService.cancelarCita(id);
        res.status(204).send();
    });

    confirmarCita = catchAsync(async (req, res) => {
        const { id } = req.params;
        await this.citasService.confirmarCita(id);
        res.status(200).send();
    });

    iniciarCita = catchAsync(async (req, res) => {
        const { id } = req.params;
        await this.citasService.iniciarCita(id);
        res.status(204).send();
    });

    finalizarCita = catchAsync(async (req, res) => {
        const { id } = req.params;
        await this.citasService.finalizarCita(id);
        res.status(204).send();
    });
}

export default CitasController;
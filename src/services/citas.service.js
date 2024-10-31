import ApiError from "../utils/apiError.util.js";
import EstadoCita from "../Enums/estado-cita.enum.js";
import { format } from 'date-fns';
import { io as ioClient } from 'socket.io-client';

class CitasService{

    constructor(citasRepository, io){
        this.socket = ioClient("http://localhost:3000");
        this.citasRepository = citasRepository;
        this.transicionesValidas = {
            [EstadoCita.Reservada]: [EstadoCita.Confirmada, EstadoCita.Cancelada],
            [EstadoCita.Confirmada]: [EstadoCita.EnEspera, EstadoCita.Cancelada, EstadoCita.EnEspera],
            [EstadoCita.EnEspera]: [EstadoCita.EnCurso],           
            [EstadoCita.EnCurso]: [EstadoCita.Finalizada],
            [EstadoCita.Finalizada]: []
        };
        
    }

    crearCita = async (cita) => {
        cita.estado_id = EstadoCita.Reservada;
        return await this.citasRepository.create(cita);
    };
    obtenerCitas = async () => {
        return this.citasRepository.getAllCitas();
    };
    obtenerCita = async (id) => {
        return this.citasRepository.getById(id);
    };
    colocarEnEspera = async (id) => {
        await this.cambiarEstadoCita(id, EstadoCita.EnEspera);
        const cita = await this.citasRepository.getPacienteParaAtencionPorCitaId(id);
        this.socket.emit('addPaciente', cita.id, cita.paciente.nombre, cita.estado.nombre);
    };
    cancelarCita = async (id) => {
        await this.cambiarEstadoCita(id, EstadoCita.Cancelada);
    }
    confirmarCita = async (id) => {
        await this.cambiarEstadoCita(id, EstadoCita.Confirmada);
    };
    iniciarCita = async (id) => {
        await this.cambiarEstadoCita(id, EstadoCita.EnCurso);
        const cita = await this.citasRepository.getPacienteParaAtencionPorCitaId(id);
        this.socket.emit('addPaciente', cita.id, cita.paciente.nombre, cita.estado.nombre);
    };
    finalizarCita = async (id) => {
        await this.cambiarEstadoCita(id, EstadoCita.Finalizada);
        const cita = await this.citasRepository.getById(id);
        this.socket.emit('eliminarPaciente', cita.id);
    };

    cambiarEstadoCita = async (id, nuevoEstado) => {
        const cita = await this.citasRepository.getById(id);
        if (!cita) {
            throw new ApiError(404, 'Cita no encontrada');
        }
        const estadosPermitidos = this.transicionesValidas[cita.estado_id];
        if (!estadosPermitidos.includes(nuevoEstado)) {
            throw new ApiError(400, `No se puede cambiar el estado de ${cita.estado_id} a ${nuevoEstado}`);
        }
        await this.citasRepository.update(id,{ estado_id: nuevoEstado });
    }
}

export default CitasService;
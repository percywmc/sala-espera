import BaseRepository from "./repository.js";
import Cita from "../models/cita.model.js";
import Paciente from "../models/paciente.model.js";
import Estado from "../models/estado.model.js";

class CitasRepository extends BaseRepository {
    constructor() {
        super(Cita);
    }

    getAllCitas = async () => {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Paciente,
                    as: 'paciente',
                    attributes: ['nombre'],
                },
                {
                    model: Estado,
                    as: 'estado',
                    attributes: ['nombre'],
                },
            ],
        });
        return citas;
    }

    getPacienteParaAtencionPorCitaId = async (citaId) => {
        const cita = await Cita.findOne({
            where: { id: citaId },
            include: [
                {
                    model: Paciente,
                    as: 'paciente', 
                    attributes: ['nombre'], 
                },
                {
                    model: Estado,
                    as: 'estado', 
                    attributes: ['nombre'],
                },
            ],
        });
        return cita;
    }
}



export default CitasRepository;
import BaseRepository from "./repository.js";
import Paciente from "../models/paciente.model.js";

class PacientesRepository extends BaseRepository {
    constructor() {
        super(Paciente);
    }
}

export default PacientesRepository;
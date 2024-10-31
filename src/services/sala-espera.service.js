import clientRedis from "../utils/cache.util.js";

const client = clientRedis;

client.on('error', (err) => {
    console.log('Error en el cliente Redis' + err);
});

class SalaEsperaService {

    constructor() {
        this.conectar();
    }

    async conectar(){
        await client.connect();
    }

    async addPaciente(citaId, pacienteNombre, estado) {
        const clavePaciente = `cita:${citaId}`;
        
        const ordenLlegada = await client.incr('contador_orden_llegada');
        const paciente = {
            citaId: citaId,
            nombre: pacienteNombre,
            estado: estado
        }
        await client.zAdd('sala-espera', {score: ordenLlegada, value: clavePaciente});
        
        await client.hSet(clavePaciente, paciente);
        console.log("paso");
    }

    async obtenerSalaEspera() {
        const clavesPacientes = await client.zRange('sala-espera', 0, -1);
        const pacientes = [];

        for (const clave of clavesPacientes) {
            const datosPaciente = await client.hGetAll(clave);
            pacientes.push(datosPaciente);
        }

        return pacientes;
    }

    async eliminarPaciente(citaId) {
        const clavePaciente = `cita:${citaId}`;
        console.log("paciente a eliminar", clavePaciente);
        await client.zRem('sala-espera', clavePaciente);
        await client.del(clavePaciente);
    }
}

export default SalaEsperaService;


class SalaEsperaController{
    constructor(salaEsperaService){
        this.salaEsperaService = salaEsperaService;
    }
    async SalaEsperaSocketHandler(socket){

        socket.on('addPaciente', async (citaId, pacienteNombre, estado) => {
            await this.salaEsperaService.addPaciente(citaId, pacienteNombre, estado);
            const salaEspera = await this.salaEsperaService.obtenerSalaEspera();
            socket.emit('actualizaSalaEspera', salaEspera);
            socket.broadcast.emit('actualizarSalaEspera', salaEspera);
        });

        socket.on('obtenerSalaEspera', async () => {
            console.log("llamando a obtener sala de espera");
            const salaEspera = await this.salaEsperaService.obtenerSalaEspera();
            console.log(salaEspera);
            socket.emit('actualizarSalaEspera', salaEspera);
            
        });

        socket.on('eliminarPaciente', async (id) => {
            await this.salaEsperaService.eliminarPaciente(id);
            const salaEspera = await this.salaEsperaService.obtenerSalaEspera();
            socket.emit('actualizarSalaEspera', salaEspera);
            socket.broadcast.emit('actualizarSalaEspera', salaEspera);
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado: ', socket.id);
        });
    }
}

export default SalaEsperaController;
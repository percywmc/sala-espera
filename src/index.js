import 'dotenv/config';
import './initContainer.js'
import { server } from './app.js';
import config from './utils/config.js';
import { db } from './utils/database.util.js';
import './models/index.js';
import { precargarDatos } from './seeders/seeders.js';

const startServer = async() => {
    try {
        console.log(config);
        await db.authenticate();
        console.log('Contectado a la base de datos');

        if(config.env === 'development'){
            await db.sync({force: true});
            console.log('Base de datos sincronizada');
            await precargarDatos();
        }
        await server.listen(config.port, () => {
            console.log(`Server escuchando el puerto  ${config.port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
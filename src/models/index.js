import { db } from '../utils/database.util.js';
import Paciente  from './paciente.model.js';
import Cita from './cita.model.js';
import Estado from './estado.model.js';

Cita.init(db);
Paciente.init(db);
Estado.init(db);

Cita.associate(db.models);
Paciente.associate(db.models);
Estado.associate(db.models);
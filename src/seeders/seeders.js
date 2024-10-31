import Estado from '../models/estado.model.js';
import Paciente from '../models/paciente.model.js';

const estadosIniciales = [
    { id: 1, nombre: 'Reservada' },
    { id: 2, nombre: 'Confirmada' },
    { id: 3, nombre: 'En Espera' },
    { id: 4, nombre: 'En Curso' },
    { id: 5, nombre: 'Finalizada' },
    { id: 6, nombre: 'Cancelada' },
];

const pacientesInicales = [
    {id: 1, nombre: 'Juan Perez'},
    {id: 2, nombre: 'Maria Rodriguez'},
    {id: 3, nombre: 'Rosario Flores'},
    {id: 4, nombre: 'Marthe Polanco'},
    {id: 5, nombre: 'Luis Manrique'},
    {id: 6, nombre: 'Catalina Suarez'},
    {id: 7, nombre: 'Hector Lara'},
    {id: 8, nombre: 'Joel Gonzales'},
]

const precargarDatos = async () => {
    try {
        await Estado.bulkCreate(estadosIniciales, { ignoreDuplicates: false });
        await Paciente.bulkCreate(pacientesInicales, { ignoreDuplicates: true });
        console.log('Estados precargados exitosamente.');
    } catch (error) {
        console.error('Error al precargar datos:', error);
    }

}
export { precargarDatos };

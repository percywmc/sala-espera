import { Model, DataTypes } from 'sequelize';

class Paciente extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Paciente',
            tableName: 'pacientes', 
            timestamps: false,
        });
    }

    static associate(models) {
        Paciente.hasMany(models.Cita, {
            foreignKey: 'paciente_id',
            as: 'citas',
        });
    }
}

export default Paciente;

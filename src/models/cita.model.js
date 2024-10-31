
import { Model, DataTypes } from 'sequelize';

class Cita extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            paciente_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'pacientes',
                    key: 'id',
                },
            },
            fecha_cita: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            hora_cita: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            estado_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'estados', 
                    key: 'id',
                },
            },
        }, {
            sequelize,
            modelName: 'Cita',
            tableName: 'citas', 
            timestamps: false,
        });
    }

    static associate(models) {
        Cita.belongsTo(models.Paciente, {
            foreignKey: 'paciente_id',
            as: 'paciente',
        });
        Cita.belongsTo(models.Estado, {
            foreignKey: 'estado_id',
            as: 'estado',
        });
    }
}

export default Cita;

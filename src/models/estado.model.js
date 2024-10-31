import { Model, DataTypes } from 'sequelize';

class Estado extends Model {
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
                unique: true,
            },
        }, {
            sequelize,
            modelName: 'Estado',
            tableName: 'estados',
            timestamps: false,
        });
    }

    static associate(models) {
        Estado.hasMany(models.Cita, {
            foreignKey: 'estado_id',
            as: 'citas',
        });
    }
}

export default Estado;

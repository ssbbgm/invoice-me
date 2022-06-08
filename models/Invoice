const {Model, Datatypes} = require('sequilize');
const sequelize = require('../config/connection');

class Invoice extends Model {}

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        due_date: {
            type: DataTypes.DATETIME,
            allowNull: false,
        },
        payment: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'client',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'invoice',
    }
);

model.exports = Invoice;
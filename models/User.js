const {Model, Datatypes} = require('sequilize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_nane: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_nane: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        business: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

model.exports = User;
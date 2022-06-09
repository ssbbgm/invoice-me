const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
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
        // firstName: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'login',
        //         key: 'first_name',
        //     },        
        // },
        // lastName: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'login',
        //         key: 'last_name',
        //     }, 
        // },
        // email: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'login',
        //         key: 'email',
        //     }, 
        // },
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
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // login_password: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'login',
        //         key: 'password',
        //     }, 
        // },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
          },      
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
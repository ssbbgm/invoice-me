const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Login extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Login.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },      
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            }
        },
        // confirmedPassword: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     primaryKey: true,
        //     set(val) {
        //         if(val === this.password){
        //             const hashedPassword = bcrypt.hashSync(val, 10);
        //             this.setDataValue('confirmedPassword', hashedPassword)
        //         }
        //     },
        //     validate: {
        //         notNull: {
        //             msg: 'Both passwords must match'
        //         }
        //     }
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     }
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
        modelName: 'login',
    }
);

module.exports = Login;
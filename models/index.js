const User = require('./User');
const Client = require('./Client');
const Invoice = require('./Invoice');
const Login = require('./Login');

//One-to-one relationship Pk:User.ID Fk: user_id
User.hasOne(Login, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Login.belongsTo(User,{
    foreignKey: 'user_id',
});

//one-to-many relationship Pk: User.ID Fk: user_id
User.hasMany(Client, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Client.belongsTo(User, {
    foreignKey: 'user_id',

});

//one-to-many relationship Pk: Client.ID Fk: client_id
Client.hasMany(Invoice, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Invoice.belongsTo(Client, {
    foreignKey: 'client_id',

});

module.exports = {User, Client, Invoice, Login};
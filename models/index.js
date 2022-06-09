const User = require('./User');
const Client = require('./Client');
const Invoice = require('./Invoice');
const Login = require('./Login');

Login.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Client, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Client.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Client.hasMany(Invoice, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Invoice.belongsTo(Client, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

module.exports = {User, Client, Invoice, Login};
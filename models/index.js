const User = require('./User');
const Client = require('./Client');
const Invoice = require('./Invoice');

User.hasMany(Client, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Client.belongsTo(User, {
    foreignKey: 'user_id'
});

Client.hasMany(Invoice, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Invoice.belongsTo(Client, {
    foreignKey: 'client_id'
});

module.exports = {User, Client, Invoice};
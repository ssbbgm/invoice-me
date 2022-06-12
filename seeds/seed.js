const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const sequelize = require('../config/connection');
const { User, Login, Client, Invoice } = require('../models');


const userData = require('./userData.json');
const loginData = require('./loginData.json');
const clientData = require('./clientData.json');
const invoiceData = require('./invoiceData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,

    returning: true,
  });

  await Login.bulkCreate(loginData, {
    individualHooks: true,

    returning: true,
  });

  await Client.bulkCreate(clientData, {
    individualHooks: false,

    returning: true,
  });

  await Invoice.bulkCreate(invoiceData, {
    individualHooks: false,

    returning: true,
  });

  
  process.exit(0);
};

seedDatabase();

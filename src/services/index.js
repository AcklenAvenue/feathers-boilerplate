
const assistCustomer = require('./assistCustomer');
const customer = require('./customer');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;
  const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: false,
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(customer);
  app.configure(assistCustomer);
};

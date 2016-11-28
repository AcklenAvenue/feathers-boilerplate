
const customerAddress = require('./customerAddress');
const order = require('./order');
const assistOrder = require('./assistOrder');
const payeezy = require('./payeezy');
const assistProduct = require('./assistProduct');
const product = require('./product');
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

  app.configure(product);
  app.configure(customerAddress);
  app.configure(order);
  app.configure(authentication);
  app.configure(user);
  app.configure(customer);
  app.configure(assistCustomer);
  app.configure(assistProduct);
  app.configure(payeezy);
  app.configure(assistOrder);

  const models = sequelize.models;
  Object.keys(models)
    .map(name => models[name])
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};

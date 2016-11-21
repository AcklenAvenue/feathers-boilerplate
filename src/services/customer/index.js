const service = require('feathers-sequelize');
const customer = require('./customer-model');
const hooks = require('./hooks');
const address = require('./address-model');

module.exports = function () {
  const app = this;
  address(app.get('sequelize'));

  const options = {
    Model: customer(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/customers', service(options));

  // Get our initialize service to that we can bind hooks
  const customerService = app.service('/customers');

  // Set up our before hooks
  customerService.before(hooks.before);

  // Set up our after hooks
  customerService.after(hooks.after);
};

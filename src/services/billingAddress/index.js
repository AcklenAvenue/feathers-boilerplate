const service = require('feathers-sequelize');
const billingAddress = require('./billingAddress-model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;

  const options = {
    Model: billingAddress(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/billingAddresses', service(options));

  // Get our initialize service to that we can bind hooks
  const billingAddressService = app.service('/billingAddresses');

  // Set up our before hooks
  billingAddressService.before(hooks.before);

  // Set up our after hooks
  billingAddressService.after(hooks.after);
};

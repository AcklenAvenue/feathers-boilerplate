const service = require('feathers-sequelize');
const shippingAddress = require('./shippingAddress-model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;

  const options = {
    Model: shippingAddress(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/shippingAddresses', service(options));

  // Get our initialize service to that we can bind hooks
  const shippingAddressService = app.service('/shippingAddresses');

  // Set up our before hooks
  shippingAddressService.before(hooks.before);

  // Set up our after hooks
  shippingAddressService.after(hooks.after);
};

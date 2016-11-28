const service = require('feathers-sequelize');
const customerAddress = require('./customerAddress-model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;

  const options = {
    Model: customerAddress(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/customerAddresses', service(options));

  // Get our initialize service to that we can bind hooks
  const customerAddressService = app.service('/customerAddresses');

  // Set up our before hooks
  customerAddressService.before(hooks.before);

  // Set up our after hooks
  customerAddressService.after(hooks.after);
};

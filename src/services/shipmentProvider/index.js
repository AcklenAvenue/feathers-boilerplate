
const hooks = require('./hooks');
const Provider = require('./shippo');

class Service {
  constructor(options) {
    this.options = options || {};
    this.provider = new Provider(this.options);
  }

  create(data) {
    return this.provider.getShipmentOptions(data.addressTo, data.orderTotal);
  }

}

module.exports = function () {
  const app = this;
  const shipmentConfig = app.get('shipment');

  // Initialize our service with any options it requires
  app.use('/shipmentProviders', new Service(shipmentConfig));

  // Get our initialize service to that we can bind hooks
  const shipmentProviderService = app.service('/shipmentProviders');

  // Set up our before hooks
  shipmentProviderService.before(hooks.before);

  // Set up our after hooks
  shipmentProviderService.after(hooks.after);
};

module.exports.Service = Service;

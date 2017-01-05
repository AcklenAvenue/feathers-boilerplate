
const hooks = require('./hooks');
const _ = require('lodash');
const Provider = require('./taxCloud');

class Service {
  constructor(options) {
    this.options = options || {};
    this.provider = new Provider(this.options);
  }

  getTaxFlaRate(itemList, rate) { // eslint-disable-line class-methods-use-this
    const itemListWithTaxes = itemList.map((item) => {
      item.tax = // eslint-disable-line no-param-reassign
        (item.productQuantity * item.productValue) * rate;
      return item;
    });

    return itemListWithTaxes;
  }

  create(data) {
    if (data.orderShippingAddress.country === 'CA') {
      return Promise.resolve(this.getTaxFlaRate(data.itemList, this.options.taxes.canadaTaxRate));
    }
    if (data.orderShippingAddress.country !== 'US') {
      return Promise.resolve(this.getTaxFlaRate(data.itemList, 0.0));
    }
    if (data.orderShippingAddress.country === 'US' && !_.includes(this.options.taxes.usTaxableStates, data.orderShippingAddress.state)) {
      return Promise.resolve(this.getTaxFlaRate(data.itemList, 0.0));
    }
    return this.provider.getTaxes(data.customerNumber, data.itemList, data.orderShippingAddress);
  }
}

module.exports = function () {
  const app = this;
  const taxesConfig = app.get('taxes');
  const addressFrom = app.get('shipment').addressFrom;

  // Initialize our service with any options it requires
  app.use('/taxes', new Service({
    taxes: taxesConfig,
    addressFrom,
  }));

  // Get our initialize service to that we can bind hooks
  const taxesService = app.service('/taxes');

  // Set up our before hooks
  taxesService.before(hooks.before);

  // Set up our after hooks
  taxesService.after(hooks.after);
};

module.exports.Service = Service;

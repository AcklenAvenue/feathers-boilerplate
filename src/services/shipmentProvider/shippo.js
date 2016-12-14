const shippoModule = require('shippo');
const _ = require('lodash');

class Shippo {
  constructor(shipmentConfig) {
    this.shipmentConfig = shipmentConfig;
    this.shippo = shippoModule(shipmentConfig.shippoKey);
  }
  /* eslint-disable no-param-reassign */
  getPackages(weight, boxes) {
    const orderedBoxes = boxes.sort((a, b) => a.max_weight - b.max_weight);
    const packageCount = _.ceil(weight / _.last(orderedBoxes).max_weight);
    const packages = _.times(packageCount, () => {
      const index = _.findIndex(orderedBoxes, box => box.max_weight >= weight);
      if (index >= 0) {
        const newPackage = _.assign(_.clone(this.shipmentConfig.parcelUnits),
                                    orderedBoxes[index],
                                    { weight });
        weight -= orderedBoxes[index].max_weight;
        return newPackage;
      }
      const newPackage = _.assign(_.clone(this.shipmentConfig.parcelUnits),
                                  _.last(orderedBoxes),
                                  { weight: _.last(orderedBoxes).max_weight });
      weight -= _.last(orderedBoxes).max_weight;
      return newPackage;
    });
    return packages;
  }
  /* eslint-enable no-param-reassign */

  getShipmentOptions(addressTo, orderTotal) {
    const orderWeight = _.ceil(orderTotal / this.shipmentConfig.dollarToLBSRatio);
    const packages = this.getPackages(orderWeight, this.shipmentConfig.boxes);
    const shipment = {
      object_purpose: 'QUOTE',
      address_from: this.shipmentConfig.addressFrom,
      address_to: addressTo,
      parcel: packages,
      async: false,
    };
    return new Promise((resolve, reject) => {
      this.shippo.shipment.create(shipment).then((response) => {
        const rates = response.rates_list.map(rate => _.pick(rate, [
          'object_state',
          'amount',
          'currency',
          'provider',
          'provider_image_75',
          'provider',
          'provider_image_200',
          'servicelevel_name',
          'servicelevel_token',
          'days']));
        resolve(rates);
      }, (error) => {
        reject(error);
      });
    });
  }
}

module.exports = Shippo;

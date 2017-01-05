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

  getCustomsDeclaration(orderTotal, orderWeight) {
    return {
      contents_type: 'MERCHANDISE',
      non_delivery_option: 'RETURN',
      certify: true,
      certify_signer: 'Inquisicorp',
      items: [
        {
          description: 'Books',
          quantity: 1,
          net_weight: orderWeight,
          mass_unit: this.shipmentConfig.parcelUnits.mass_unit,
          value_amount: orderTotal,
          value_currency: 'USD',
          tariff_number: '',
          origin_country: 'US',
        }],
    };
  }

  getAllShippingServiceList() {
    const allRates = this.shipmentConfig.carriersAndServices
      .map(carrier => carrier.carrierServices);
    return _.flattenDeep(allRates);
  }

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
    if (addressTo.country !== 'US') {
      shipment.customs_declaration = this.getCustomsDeclaration(orderTotal, orderWeight);
    }
    return new Promise((resolve, reject) => {
      this.shippo.shipment.create(shipment).then((response) => {
        const allAssistRates = this.getAllShippingServiceList();
        const rates = response.rates_list.map((rate) => {
          const rateToReturn = _.pick(rate, [
            'object_state',
            'amount',
            'currency',
            'provider',
            'provider_image_75',
            'provider',
            'provider_image_200',
            'servicelevel_name',
            'servicelevel_token',
            'days']);
          const assist = _.find(allAssistRates, assistRate =>
            assistRate.shippoServiceToken === rateToReturn.servicelevel_token);
          if (!assist) {
            return undefined;
          }
          rateToReturn.assistServiceCode = assist.assistServiceCode;
          return rateToReturn;
        });
        resolve(_.filter(rates, rate => rate));
      }, (error) => {
        reject(error);
      });
    });
  }
}

module.exports = Shippo;

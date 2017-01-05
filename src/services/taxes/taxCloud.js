const rp = require('request-promise');

class TaxCloud {
  constructor(taxesConfig) {
    this.taxesConfig = taxesConfig || {};
  }

  getTaxRequestBody(customerNumber, itemList, addressTo) {
    const destination = {
      Address1: addressTo.addressLine1,
      Address2: addressTo.addressLine2,
      City: addressTo.city,
      State: addressTo.state,
      Zip5: addressTo.zipCode,
    };

    const origin = {
      Address1: this.taxesConfig.addressFrom.street1,
      City: this.taxesConfig.addressFrom.city,
      State: this.taxesConfig.addressFrom.state,
      Zip5: this.taxesConfig.addressFrom.zip,
    };

    const cartItems = itemList.map((item, index) => { // eslint-disable-line arrow-body-style
      return {
        Qty: item.productQuantity,
        Price: item.productValue,
        TIC: this.taxesConfig.taxes.ticForCartItems,
        ItemID: item.productId,
        Index: index,
      };
    });

    return {
      deliveredBySeller: false,
      destination,
      origin,
      cartItems,
      customerID: customerNumber,
      apiLoginId: this.taxesConfig.taxes.loginId,
    };
  }

  getTaxRequesOptions(taxRequest) {
    return {
      method: 'POST',
      uri: `${this.taxesConfig.taxes.taxCloudUrl}?apiKey=${this.taxesConfig.taxes.apiKey}`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: taxRequest,
      json: true,
    };
  }

  getTaxes(customerNumber, itemList, addressTo) {
    const body = this.getTaxRequestBody(customerNumber, itemList, addressTo);
    const options = this.getTaxRequesOptions(body);

    return new Promise((resolve, reject) => {
      rp(options)
    .then((taxes) => {
      console.log(taxes);
      if (taxes.ResponseType === 3) {
        const itemListWithTaxes = taxes.CartItemsResponse.map((item) => {
          itemList[item.CartItemIndex].tax = // eslint-disable-line no-param-reassign
            item.TaxAmount;
          return itemList[item.CartItemIndex];
        });

        return resolve(itemListWithTaxes);
      }
      return reject(new Error(taxes.Messages[0].Message));
    }).catch(err => reject(err));
    });
  }
}

module.exports = TaxCloud;

/* eslint-disable */
'use strict';

const hooks = require('./hooks');
const ibmdb = require('ibm_db');
const ProductQueries = require('./queries');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    const thisOptions = this.options;
    return new Promise((resolve, reject) => {
      ibmdb.open(`DRIVER={DB2};DATABASE=${thisOptions.database};HOSTNAME=${thisOptions.host};UID=${thisOptions.user};PWD=${thisOptions.password};PORT=${thisOptions.port};PROTOCOL=TCPIP`,
        function (errDB2, connDB2) {
            if (errDB2) {
              console.log(errDB2);
              reject(errDB2);
            }
            const productQueries = new ProductQueries();
            const query = productQueries.getSelectProductQuery(thisOptions.library, thisOptions.companyNumber, id);
            var rowsAssistProduct = connDB2.querySync(query);
            if (rowsAssistProduct && rowsAssistProduct.length > 0) {
              const customerId = (params.user && params.user.customer) ? params.user.customer.customerNumberFromAS : '';
              const queryPrice = productQueries.getSelectProductPriceQuery(thisOptions.library, thisOptions.companyNumber, id);
              const rowsAssistPrice = connDB2.querySync(queryPrice);
              var price = '0.00';
              if (rowsAssistPrice && rowsAssistPrice.length > 0) {
                price = parseFloat(rowsAssistPrice[0].ProductPrice.trim())
              }
              resolve({
                assistCode: rowsAssistProduct[0].assistCode.trim(),
                name: rowsAssistProduct[0].name.trim(),
                description: rowsAssistProduct[0].description.trim(),
                price,
              });
            } else {
              resolve({});
            }
        });
    });
  }

  create(data, params) {
    if(Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;
  const as400 = app.get('AS400');

  // Initialize our service with any options it requires
  app.use('/assistProducts', new Service(as400));

  // Get our initialize service to that we can bind hooks
  const assistProductService = app.service('/assistProducts');

  // Set up our before hooks
  assistProductService.before(hooks.before);

  // Set up our after hooks
  assistProductService.after(hooks.after);
};

module.exports.Service = Service;

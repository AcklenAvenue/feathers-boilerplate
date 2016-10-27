/* eslint-disable */
'use strict';

const hooks = require('./hooks');
const ibmdb = require('ibm_db');

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

            const query = 'select IAPRT# as assistCode, IA101 as name, IA103 as description from astdta.ICPRTMIA  where IACOM# = \'' +
              thisOptions.companyNumber +'\' and IAPRT# = \'' +
              id +'\' and IAWEBF = 1';
            var rowsAssistProduct = connDB2.querySync(query);

            if (rowsAssistProduct && rowsAssistProduct.length > 0) {
              resolve({
                assistCode: rowsAssistProduct[0].ASSISTCODE.trim(),
                name: rowsAssistProduct[0].NAME.trim(),
                description: rowsAssistProduct[0].DESCRIPTION.trim(),
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

/* eslint-disable */
'use strict';

const ibmdb = require('ibm_db');
const hooks = require('./hooks');
const customerQuery = require('./queries');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  getNewAssistProspectNumber() {
    return new Promise((resolve, reject) => {
      const thisOptions = this.options;
      try {
        ibmdb.open(`DRIVER={DB2};DATABASE=${thisOptions.database};HOSTNAME=${thisOptions.host};UID=${thisOptions.user};PWD=${thisOptions.password};PORT=${thisOptions.port};PROTOCOL=TCPIP`,
          function (errDB2, connDB2) {
              if (errDB2) return console.log(errDB2);

              try {
                var rowsAssistCustomer = connDB2.querySync('select ASTPROOF2.GetProspectNumber(cast(\'' + thisOptions.companyNumber + '\' as char(3))) as NewCustomerNumber from SYSIBM.SYSDUMMY1');
                console.log(rowsAssistCustomer);
                const newCustomerAssist = rowsAssistCustomer[0].NEWCUSTOMERNUMBER;
                resolve(newCustomerAssist);
              }
              catch (err) {
                console.log(err);
                reject(err);
              }
          });
      }
      catch(err) {
        console.log(err);
        reject(err);
      }
    });
  }

  create(data, params) {
    const thisOptions = this.options;
    try {
      ibmdb.open(`DRIVER={DB2};DATABASE=${thisOptions.database};HOSTNAME=${thisOptions.host};UID=${thisOptions.user};PWD=${thisOptions.password};PORT=${thisOptions.port};PROTOCOL=TCPIP`,
        function (errDB2, connDB2) {
            if (errDB2) return console.log(errDB2);

            try {
              const customerInfo = {
                inquisicartCustomerNumber: data.id,
                companyName: data.lastName + ', ' + data.firstName,
                sicCode: '',
                taxId: '',
                customerNumberFromAS: data.customerNumberFromAS,
                addressSequenceNumber: '0',
                customerAddresses: data.customerAddresses,
                email: data.user.email
              };
              const customerQueries = new customerQuery();
              const queries = customerQueries.getCustomerInsertQueries(thisOptions.library, thisOptions.companyNumber, customerInfo, data.user.email);
              queries.forEach((query) => {
                const response = connDB2.querySync(query);
              });
              connDB2.close(function () {
                  console.log('done');
              });
            }
            catch (err) {
              console.log(err);
            }
        });
    }
    catch (err) {
      console.log(err);
    }
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

module.exports = function () {
  const app = this;
  const as400 = app.get('AS400');

  // Initialize our service with any options it requires
  app.use('/assistCustomers', new Service(as400));

  // Get our initialize service to that we can bind hooks
  const assistCustomerService = app.service('/assistCustomers');

  // Set up our before hooks
  assistCustomerService.before(hooks.before);

  // Set up our after hooks
  assistCustomerService.after(hooks.after);
};

module.exports.Service = Service;

/* eslint-disable */
'use strict';

const hooks = require('./hooks');
const orderQuery = require('./queries');
const ibmdb = require('ibm_db');

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

  getNewAssistOrderNumber() {
    return new Promise((resolve, reject) => {
      const thisOptions = this.options;
      try {
        ibmdb.open(`DRIVER={DB2};DATABASE=${thisOptions.database};HOSTNAME=${thisOptions.host};UID=${thisOptions.user};PWD=${thisOptions.password};PORT=${thisOptions.port};PROTOCOL=TCPIP`,
          function (errDB2, connDB2) {
              if (errDB2) return console.log(errDB2);

              try {
                const rowsOrderAssist = connDB2.querySync('select ASTPROOF2.GetOrderNumber(cast(\'' + thisOptions.companyNumber + '\' as char(3))) as NewOrderNumber from SYSIBM.SYSDUMMY1');
                console.log(rowsOrderAssist);
                const newOrderAssist = rowsOrderAssist[0].NEWORDERNUMBER;
                resolve(newOrderAssist);
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
    // return new Promise((resolve, reject) => {
      const thisOptions = this.options;
      try {
        ibmdb.open(`DRIVER={DB2};DATABASE=${thisOptions.database};HOSTNAME=${thisOptions.host};UID=${thisOptions.user};PWD=${thisOptions.password};PORT=${thisOptions.port};PROTOCOL=TCPIP`,
          function (errDB2, connDB2) {
              if (errDB2) return console.log(errDB2);

              try {
                const orderQueries = new orderQuery();
                const queries = orderQueries.getOrderInsertQueries(thisOptions.library, thisOptions.companyNumber, thisOptions.merchantCode, data.order, data.user.email);

                queries.forEach((query) => {
                  const response = connDB2.querySync(query);
                });
                connDB2.close(function () {
                    console.log('done');
                });
                // resolve("done");
              }
              catch (err) {
                console.log(err);
                // reject(err);
              }
          });
      }
      catch (err) {
        console.log(err);
        // reject(err);
      }
    // });

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
  app.use('/assistOrders', new Service(as400));

  // Get our initialize service to that we can bind hooks
  const assistOrderService = app.service('/assistOrders');

  // Set up our before hooks
  assistOrderService.before(hooks.before);

  // Set up our after hooks
  assistOrderService.after(hooks.after);
};

module.exports.Service = Service;

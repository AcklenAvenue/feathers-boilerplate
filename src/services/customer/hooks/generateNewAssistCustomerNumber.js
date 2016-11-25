/* eslint-disable */

// src\services\order\hooks\generateNewAssistCustomerNumber.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const assistCustomerService = hook.app.service('/assistCustomers');
    hook.generateNewAssistCustomerNumber = true;
    if (hook.data.customerAddresses && hook.data.customerAddresses.length > 0) {
      return assistCustomerService.getNewAssistCustomerNumber()
      .then((newCustomerNumber) => {
        hook.data.isProspect = false;
        hook.data.customerNumberFromAS = newCustomerNumber;
      });
    } else {
      return assistCustomerService.getNewAssistProspectNumber()
      .then((newCustomerNumber) => {
        hook.data.isProspect = true;
        hook.data.customerNumberFromAS = newCustomerNumber;
      });
    }
  };
};

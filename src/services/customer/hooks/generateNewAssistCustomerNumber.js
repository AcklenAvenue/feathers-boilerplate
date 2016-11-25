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
    return assistCustomerService.getNewAssistProspectNumber()
      .then((newCustomerNumber) => {
        hook.data.customerNumberFromAS = newCustomerNumber;
      });
  };
};

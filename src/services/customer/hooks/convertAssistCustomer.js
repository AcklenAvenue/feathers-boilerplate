/* eslint-disable */

'use strict';

// src\services\customer\hooks\convertAssistCustomer.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.convertAssistCustomer = true;
    const assistCustomerService = hook.app.service('/assistCustomers');
    if (hook.data.isProspect && hook.data.billingAddress) {
      return assistCustomerService.getNewAssistCustomerNumber()
      .then((newCustomerNumber) => {
        hook.data.isProspect = false;
        const prospectNumber = hook.data.customerNumberFromAS;
        hook.data.customerNumberFromAS = newCustomerNumber;
        assistCustomerService.convert(prospectNumber, newCustomerNumber);
      });
    }
  };
};

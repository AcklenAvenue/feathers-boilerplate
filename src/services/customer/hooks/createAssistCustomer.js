/* eslint-disable */

'use strict';

// src\services\customer\hooks\createAssistCustomer.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    if (hook.method !== 'patch' ||
        (hook.params.updateParams &&
        hook.params.updateParams.updateAddresses)) {
      const assistCustomerService = hook.app.service('/assistCustomers');
      assistCustomerService.create(hook.result);
    }
    hook.createAssistCustomer = true;
  };
};

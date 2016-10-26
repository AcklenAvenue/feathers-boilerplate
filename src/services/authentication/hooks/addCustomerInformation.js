/* eslint-disable */

'use strict';

// src\services\authentication\hooks\addCustomerInformation.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const customerService = hook.app.service('/customers');
    return customerService.find({
      query: {
        userId: hook.result.data.id
      }
    }).then(customerData => {
      hook.result.data.customer = customerData.data[0].dataValues;
    });
  };
};

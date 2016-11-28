/* eslint-disable */

'use strict';

// src\services\customer\hooks\updateAddresses.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.updateAddresses = true;
    const customerAddresses = hook.app.service('/customerAddresses');
    const updatePromises = hook.data.customerAddresses.map(address => {
      if (address.id) {
        console.log('update');
        return customerAddresses.update(address.id, address);
      } else {
        console.log('create');
        return customerAddresses.create(address);
      }
    });

    return new Promise((resolve, reject) => {
      Promise.all(updatePromises).then(() => {
        resolve()
      }).catch((err) => {
        reject(err);
      });
    });

  };
};

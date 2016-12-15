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
    if (hook.params.updateParams && hook.params.updateParams.updateAddresses) {
      const shippingAddresses = hook.app.service('/shippingAddresses');
      const billingAddresses = hook.app.service('/billingAddresses');

      var maxSequence = hook.data.shippingAddresses.reduce((max, address) => {
        return (max < (address.assistSequence || -1 )) ? address.assistSequence : max;
      }, 0);

      const updatePromises = hook.data.shippingAddresses.map(address => {
        if (address.id !== 0) {
          console.log('update');
          return shippingAddresses.update(address.id, address);
        } else {
          console.log('create');
          maxSequence++;
          address.assistSequence = maxSequence;
          return shippingAddresses.create(address);
        }
      });
      updatePromises.push(
        (hook.data.billingAddress && hook.data.billingAddress.id)
          ? billingAddresses.update(hook.data.billingAddress.id, hook.data.billingAddress)
          : billingAddresses.create(hook.data.billingAddress)
      );
      return new Promise((resolve, reject) => {
        Promise.all(updatePromises).then(() => {
          resolve()
        }).catch((err) => {
          reject(err);
        });
      });
    }
  };
};

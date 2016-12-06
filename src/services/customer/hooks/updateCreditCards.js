/* eslint-disable */

// src\services\customer\hooks\updateCreditCards.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.updateCreditCards = true;
    if (hook.params.updateParams && hook.params.updateParams.updateCreditCards) {
      const customerCreditCards = hook.app.service('/customerCreditCards');
      const updatePromises = hook.data.customerCreditCards.map((cc) => {
        if (cc.id !== 0) {
          console.log('update');
          return customerCreditCards.update(cc.id, cc);
        } else {
          console.log('create');
          return customerCreditCards.create(cc);
        }
      });
      return new Promise((resolve, reject) => {
        Promise.all(updatePromises).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    }
  };
};

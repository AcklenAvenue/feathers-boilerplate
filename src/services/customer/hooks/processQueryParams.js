/* eslint-disable */

// src\services\customer\hooks\processQueryParams.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.processQueryParams = true;
    hook.params.updateParams = {};
    return Promise.resolve()
      .then(() => {
        if (hook.params.query && hook.params.query.updateAddresses !== undefined) {
          hook.params.updateParams.updateAddresses = hook.params.query.updateAddresses;
          delete hook.params.query.updateAddresses;
        }
        if (hook.params.query && hook.params.query.updateCreditCards !== undefined) {
          hook.params.updateParams.updateCreditCards = hook.params.query.updateCreditCards;
          delete hook.params.query.updateCreditCards;
        }
      });
  }
};

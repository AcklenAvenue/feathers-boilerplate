/* eslint-disable */

// src\services\customer\hooks\includeDetailModels.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.includeDetailModels = true;
    return new Promise((resolve, reject) => {
      const sequelize = hook.app.get('sequelize')
      hook.params.sequelize = {
        include: [{ model: sequelize.models.shippingAddresses }, { model: sequelize.models.billingAddresses }]
      }
      resolve();
    });
  };
};

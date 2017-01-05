/* eslint-disable */

// src\services\order\hooks\includeDetailModels.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const sequelize = hook.app.get('sequelize')
    hook.params.sequelize = {
      include: [{ model: sequelize.models.orderDetails },
                { model: sequelize.models.orderPayments },
                { model: sequelize.models.orderShippingAddresses }]
    }
    hook.includeDetailModels = true;
  };
};

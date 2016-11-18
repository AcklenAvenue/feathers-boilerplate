/* eslint-disable */

// src\services\order\hooks\generateNewAssistOrderNumber.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const assistOrderService = hook.app.service('/assistOrders');
    hook.generateNewAssistOrderNumber = true;
    return assistOrderService.getNewAssistOrderNumber()
      .then((newOrderNumber) => {
        hook.data.orderNumberFromAS = newOrderNumber;
      });
  };
};

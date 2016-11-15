/* eslint-disable */

// src\services\order\hooks\createAssistOrder.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const assistOrderService = hook.app.service('/assistOrders');

    const assistOrder = {
      user: {
        email: 'test@acklenavenue.com', // Must be replaced with real user email!!!
      },
      order: hook.data,
    };

    assistOrder.order.id = hook.result.id;

    assistOrderService.create(assistOrder);
    hook.createAssistOrder = true;
  };
};

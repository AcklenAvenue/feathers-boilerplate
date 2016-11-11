/* eslint-disable */

// src\services\order\hooks\createAssistOrder.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.params.sequelize = {
      include: [{ model: hook.app.get('sequelize').models.orderDetails }]
    }
    //const assistOrderService = hook.app.service('/assistOrders');

    /*const assistOrder = {
      user: {
        email: 'test@acklenavenue.com', // Must be replaced with real user email!!!
      },
      order: {
        orderNumber: '1000009',
        customerNumber: 188814,
        orderNumberFromAS: '',
        currencyCode: 'USD',
        orderAmount: 100,
        tax: 10,
        clientName: 'Acklen Test',
        orderDetails: [
          {
            sequence: '0',
            offerId: '',
            keyCode: '',
            productCode: 'AS03',
            unitOfMeasure: 'EACH',
            productQuantity: 1,
            productValue: 100,
          },
          {
            sequence: '1',
            offerId: '',
            keyCode: '',
            productCode: '3L194',
            unitOfMeasure: 'EACH',
            productQuantity: 2,
            productValue: 100,
          },
        ],
        paymentType: 'VS',
        paymentNumber: '2537446225198291',
        paymentAmount: 100,
        expirationDate: '2030-10-01 00:00:00.000000',
        authorizationCode: '',
        authorizationCodeLength: 0,
        authorizationDate: '2016-11-10 00:00:00.000000',
        creditCardCVV: 'I',
      },
    };

    assistOrderService.create(assistOrder);*/
    hook.createAssistOrder = true;
  };
};

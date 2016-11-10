

// orderPayment-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const orderPayment = sequelize.define('orderPayments', {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    paymentType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paymentNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paymentAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    expirationDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    authorizationCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    authorizationCodeLength: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    authorizationDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    creditCardCVV: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  orderPayment.sync();

  return orderPayment;
};

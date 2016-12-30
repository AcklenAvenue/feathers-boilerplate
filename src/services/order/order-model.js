

// order-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

// This must be set bigger than last customer Id from previous system
const startId = Math.floor(Math.random() * 1000000) + 2000000;

module.exports = (sequelize) => {
  const order = sequelize.define('orders', {
    customerNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    orderNumberFromAS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    orderAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    tax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    clientName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    initialAutoIncrement: startId,
    classMethods: {
      associate(models) {
        this.hasOne(models.orderShippingAddresses);
        this.hasOne(models.orderPayments);
        this.hasMany(models.orderDetails);
      },
    },
  });

  order.sync();

  return order;
};



// order-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

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
    initialAutoIncrement: '1000100',
    classMethods: {
      associate(models) {
        // order.hasOne(sequelize.models.orderPayments);
        this.hasMany(models.orderDetails);
      },
    },
  });

  order.sync();

  return order;
};

// shippingAddress-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const shippingAddress = sequelize.define('shippingAddresses', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addressLine3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customerId: {
      required: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    initialAutoIncrement: 1000,
  });

  shippingAddress.sync();

  return shippingAddress;
};

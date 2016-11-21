
// address-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

// This must be set bigger than last customer Id from previous system
const startId = Math.floor(Math.random() * 1000000) + 2000000;

module.exports = (sequelize) => {
  const address = sequelize.define('customerAddresses', {
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
      allowNull: false,
    },
    addressLine3: {
      type: Sequelize.STRING,
      allowNull: false,
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
    initialAutoIncrement: startId,
  });

  address.sync();

  return address;
};


// customer-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

// This must be set bigger than last customer Id from previous system
const startId = Math.floor(Math.random() * 1000000) + 2000000;

module.exports = (sequelize) => {
  const customer = sequelize.define('customers', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customerNumberFromAS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      required: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    initialAutoIncrement: startId,
    classMethods: {
      associate(models) {
        this.belongsTo(models.users);
        this.hasMany(models.customerAddresses);
      },
    },
  });

  customer.sync();

  return customer;
};

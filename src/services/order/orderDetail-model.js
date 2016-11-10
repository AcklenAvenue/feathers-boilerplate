

// orderDetail-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const orderDetail = sequelize.define('orderDetails', {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sequence: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    offerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    keyCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unitOfMeasure: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productQuantity: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    productValue: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  orderDetail.belongsTo(sequelize.models.products);
  orderDetail.sync();

  return orderDetail;
};

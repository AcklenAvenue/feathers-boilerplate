'use strict';
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;
  
  /*const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: false
  });
  app.set('sequelize', sequelize);*/

  app.configure(authentication);
  //app.configure(user);
};

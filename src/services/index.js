'use strict';
const authentication = require('./authentication');
const user = require('./user');

module.exports = {

  get: function(app) {

    /*const sequelize = new Sequelize(app.get('mysql'), {
      dialect: 'mysql',
      logging: false
    });
    app.set('sequelize', sequelize);*/

    app.configure(authentication);

    return [user.configure(app)];
  }
}

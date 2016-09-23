'use strict';

const Waterline = require('waterline');
const service = require('feathers-waterline');
const user = require('./user-model');
const hooks = require('./hooks');
const config = require('../../../config/config')


module.exports = function(){
  const app = this;
  const ORM = new Waterline();

  ORM.loadCollection(user);
  ORM.initialize(config, (error, data) => {

    if (error) {
      console.error(error);
    }

    const options = {
      Model: data.collections.user,
      paginate: {
        default: 5,
        max: 25
      }
    };

      // Initialize our service with any options it requires
    app.use('/users', service(options));

    // Get our initialize service to that we can bind hooks
    const userService = app.service('/users');

    // Set up our before hooks
    userService.before(hooks.before);

    // Set up our after hooks
    userService.after(hooks.after);

  });

};

'use strict';

const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  identity: 'user',
  schema: true,
  connection: 'mySqlConnection',
  attributes: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }
});

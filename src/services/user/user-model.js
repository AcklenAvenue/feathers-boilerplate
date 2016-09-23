'use strict';

const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  identity: 'user',
  schema: true,
  connection: 'db2Connection',
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

/* eslint-disable */
'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const addCustomerInformation = require('./addCustomerInformation');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [addCustomerInformation()],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

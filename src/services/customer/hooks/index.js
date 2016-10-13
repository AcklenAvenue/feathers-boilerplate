/* eslint-disable no-unused-vars, no-console */

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const createAssistCustomer = require('./createAssistCustomer');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [createAssistCustomer()],
  update: [],
  patch: [],
  remove: [],
};

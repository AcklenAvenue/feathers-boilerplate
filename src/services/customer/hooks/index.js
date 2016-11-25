/* eslint-disable no-unused-vars, no-console */

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const createAssistCustomer = require('./createAssistCustomer');
const includeDetailModels = require('./includeDetailModels');
const generateNewAssistCustomerNumber = require('./generateNewAssistCustomerNumber');

exports.before = {
  all: [includeDetailModels()],
  find: [],
  get: [],
  create: [generateNewAssistCustomerNumber()],
  update: [],
  patch: [],
  remove: [],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [hooks.populate('user', { field: 'userId', service: '/users' }),
    hooks.remove('user.password', 'user.facebookId', 'user.googleId', hook => true), createAssistCustomer()],
  update: [hooks.populate('user', { field: 'userId', service: '/users' }),
    hooks.remove('user.password', 'user.facebookId', 'user.googleId', hook => true), createAssistCustomer()],
  patch: [],
  remove: [],
};

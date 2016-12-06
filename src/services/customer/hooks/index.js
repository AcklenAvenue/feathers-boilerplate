/* eslint-disable no-unused-vars, no-console */

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const createAssistCustomer = require('./createAssistCustomer');
const convertAssistCustomer = require('./convertAssistCustomer');
const includeDetailModels = require('./includeDetailModels');
const generateNewAssistCustomerNumber = require('./generateNewAssistCustomerNumber');
const updateAddresses = require('./updateAddresses');
const updateCreditCards = require('./updateCreditCards');
const processQueryParams = require('./processQueryParams');

exports.before = {
  all: [includeDetailModels()],
  find: [],
  get: [],
  create: [generateNewAssistCustomerNumber()],
  update: [],
  patch: [processQueryParams(), updateAddresses(), updateCreditCards(), convertAssistCustomer()],
  remove: [],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [hooks.populate('user', { field: 'userId', service: '/users' }),
    hooks.remove('user.password', 'user.facebookId', 'user.googleId', hook => true), createAssistCustomer()],
  update: [],
  patch: [hooks.populate('user', { field: 'userId', service: '/users' }),
    hooks.remove('user.password', 'user.facebookId', 'user.googleId', hook => true), createAssistCustomer()],
  remove: [],
};

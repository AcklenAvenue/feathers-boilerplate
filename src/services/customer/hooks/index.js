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
  create: [hooks.populate('user', { field: 'userId', service: '/users' }),
           hooks.remove('user.password', 'user.facebookId', 'user.googleId', hook => true), createAssistCustomer()],
  update: [],
  patch: [],
  remove: [],
};

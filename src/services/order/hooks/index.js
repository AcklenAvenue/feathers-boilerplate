
/* eslint-disable no-unused-vars, no-console */
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const createAssistOrder = require('./createAssistOrder');
const includeDetailModels = require('./includeDetailModels');

exports.before = {
  all: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [includeDetailModels()],
  update: [],
  patch: [],
  remove: [],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [createAssistOrder()],
  update: [],
  patch: [],
  remove: [],
};

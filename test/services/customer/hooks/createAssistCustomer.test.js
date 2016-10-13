/* eslint-disable */
'use strict';

const assert = require('assert');
const createAssistCustomer = require('../../../../src\services\customer\hooks\createAssistCustomer.js');

describe('customer createAssistCustomer hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    createAssistCustomer()(mockHook);

    assert.ok(mockHook.createAssistCustomer);
  });
});

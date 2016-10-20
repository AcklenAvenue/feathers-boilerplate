'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('assistCustomer service', function() {
  it('registered the assistCustomers service', () => {
    assert.ok(app.service('assistCustomers'));
  });
});

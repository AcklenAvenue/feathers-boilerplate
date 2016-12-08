'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('customerCreditCard service', function() {
  it('registered the customerCreditCards service', () => {
    assert.ok(app.service('customerCreditCards'));
  });
});

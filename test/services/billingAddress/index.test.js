'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('billingAddress service', function() {
  it('registered the billingAddresses service', () => {
    assert.ok(app.service('billingAddresses'));
  });
});

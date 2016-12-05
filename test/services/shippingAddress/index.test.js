'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shippingAddress service', function() {
  it('registered the shippingAddresses service', () => {
    assert.ok(app.service('shippingAddresses'));
  });
});

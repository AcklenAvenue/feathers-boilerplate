'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('customerAddress service', function() {
  it('registered the customerAddresses service', () => {
    assert.ok(app.service('customerAddresses'));
  });
});

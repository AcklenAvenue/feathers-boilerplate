'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('payeezy service', function() {
  it('registered the payeezy service', () => {
    assert.ok(app.service('payeezy'));
  });
});

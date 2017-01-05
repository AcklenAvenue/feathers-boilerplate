'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('taxes service', function() {
  it('registered the taxes service', () => {
    assert.ok(app.service('taxes'));
  });
});

'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('assistOrder service', function() {
  it('registered the assistOrders service', () => {
    assert.ok(app.service('assistOrders'));
  });
});

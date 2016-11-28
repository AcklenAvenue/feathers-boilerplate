'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('customerAdress service', function() {
  it('registered the customerAdresses service', () => {
    assert.ok(app.service('customerAdresses'));
  });
});

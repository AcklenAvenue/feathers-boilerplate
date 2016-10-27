'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('assistProduct service', function() {
  it('registered the assistProducts service', () => {
    assert.ok(app.service('assistProducts'));
  });
});

'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shipmentProvider service', function() {
  it('registered the shipmentProviders service', () => {
    assert.ok(app.service('shipmentProviders'));
  });
});

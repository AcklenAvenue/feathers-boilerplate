/* eslint-disable */

'use strict';

// src\services\customer\hooks\updateProductInformation.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    const productService = hook.app.service('/products');
    return productService.find({
      query: {
        assistCode: hook.result.assistCode
      }
    }).then(localProduct => {
      // Remove! Fake price
      hook.result.price = (new Date()).getMilliseconds() / 10.0;

      if (localProduct.data.length == 0) {
        productService.create(hook.result);
      } else {
        const productToUpdate = localProduct.data[0].dataValues;
        productService.update(productToUpdate.id, hook.result);
      }
    });
  };
};

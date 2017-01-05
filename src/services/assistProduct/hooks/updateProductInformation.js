/* eslint-disable */

'use strict';

// src\services\customer\hooks\updateProductInformation.js
//
// Use this hook to manipulate incoming or outgoing data. For more information
// on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    console.log(hook.result);
    const productService = hook
      .app
      .service('/products');
    return new Promise((resolve, reject) => {
      if (!hook.result.assistCode) {
        resolve();
      }

      productService
        .find({
        query: {
          assistCode: hook.result.assistCode
        }
      })
        .then(localProduct => {
          if (localProduct.data.length == 0) {
            productService
              .create(hook.result)
              .then((data) =>{
                hook.result.id = data.dataValues.id;
                resolve();
              }).catch((error) => {
                console.log(error);
                reject(error);
              });
          } else {
            const productToUpdate = localProduct.data[0].dataValues;
            productService.update(productToUpdate.id, hook.result);
            hook.result.id = productToUpdate.id;
            resolve();
          }
        }).catch((error) => reject(error));
    });

  };
};

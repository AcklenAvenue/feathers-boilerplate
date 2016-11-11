const hooks = require('./hooks');
const CryptoJS = require('crypto-js');
const rp = require('request-promise');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  getPayeezyAuthorizeBodyCall(payment) {
    return {
      merchant_ref: this.options.merchantReference,
      transaction_type: 'authorize',
      method: 'token',
      amount: '0',
      currency_code: 'USD',
      token: {
        token_type: this.options.tokenType,
        token_data: {
          type: payment.creditCardType,
          value: payment.creditCardToken,
          cardholder_name: payment.creditCardName,
          exp_date: payment.creditCardExpiration,
        },
      },
    };
  }

  getHMACSignature(body) {
    const payload = JSON.stringify(body);
    const nonce = Math.random() * 1000000000000000000;
    const timeStamp = new Date().getTime();

    const data = `${this.options.apiKey}${nonce}${timeStamp}${this.options.paymentToken}${payload}`;
    const digest = CryptoJS.HmacSHA256(data, this.options.hmacKey); // eslint-disable-line new-cap
    const hmac = new Buffer(digest.toString()).toString('base64');

    return {
      nonce,
      timeStamp,
      hmac,
    };
  }

  getPayeezyAuthorizeHeadersCall(body) {
    const hmacSignature = this.getHMACSignature(body);

    return {
      'Content-Type': 'application/json',
      apikey: this.options.apiKey,
      Authorization: hmacSignature.hmac,
      nonce: hmacSignature.nonce,
      timestamp: hmacSignature.timeStamp,
      token: this.options.paymentToken,
      'Access-Control-Allow-Origin': '*',
    };
  }

  getPayeezyAuthorizeUrl() {
    return `${this.options.url}/transactions`;
  }

  create(data) {
    const url = this.getPayeezyAuthorizeUrl();
    const requestBody = this.getPayeezyAuthorizeBodyCall(data);
    const headers = this.getPayeezyAuthorizeHeadersCall(requestBody);

    const options = {
      method: 'POST',
      uri: url,
      body: requestBody,
      headers,
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options)
      .then((body) => {
        resolve({
          correlation_id: body.correlation_id,
          transaction_status: body.transaction_status,
          validation_status: body.validation_status,
          transaction_id: body.transaction_id,
          transaction_tag: body.transaction_tag,
          bank_resp_code: body.bank_resp_code,
          bank_message: body.bank_message,
          gateway_resp_code: body.gateway_resp_code,
          gateway_message: body.gateway_message,
          cvv2: body.cvv2,
        });
      })
      .catch((err) => {
        const errMessage = err.message.substring(err.message.indexOf('{'));
        const errObj = JSON.parse(errMessage);
        const returnedError = new Error();
        returnedError.message = 'Error requesting payment authorization from payeezy.';
        returnedError.errors = errObj;
        console.log(returnedError);
        reject(returnedError);
      });
    });
  }
}

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/payeezy', new Service(app.get('payments')));

  // Get our initialize service to that we can bind hooks
  const payeezyService = app.service('/payeezy');

  // Set up our before hooks
  payeezyService.before(hooks.before);

  // Set up our after hooks
  payeezyService.after(hooks.after);
};

module.exports.Service = Service;

const squel = require('squel');
const moment = require('moment');

class AddressQueries {
  constructor(library, companyNumber) {
    this.library = library;
    this.companyNumber = companyNumber;
  }
  formatDateToAS400(date) { // eslint-disable-line class-methods-use-this
    return moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSS');
  }

  getTable(tableName) {
    return `${this.library}.${tableName}`;
  }

  getCustomerAddressInsert(webCartCustomerNumber, addressSequence,
    customerName, addressLine1, addressLine2, addressLine3, city, state, zipCode,
    country, email1, email2, userEmail) {
    const insertAddress = squel.insert().into(this.getTable('T_ADDRESS'))
          .setFields(
      {
        ADDR_CMCD: this.companyNumber,
        ADDR_CSTCD: webCartCustomerNumber,
        ADDR_ADSQ: addressSequence,
        ADDR_PMSQ: '0',
        ADDR_CSTNM: customerName,
        ADDR_LINE1: addressLine1,
        ADDR_LINE2: addressLine2,
        ADDR_LINE3: addressLine3,
        ADDR_CTY_D: city,
        ADDR_LDESC: '',
        ADDR_LOCCD: state,
        ADDR_LCCCD: '',
        ADDR_PSTCD: zipCode,
        ADDR_CNTCD: country,
        ADDR_EML1: email1,
        ADDR_EML2: email2,
        ADDR_LMDT: this.formatDateToAS400(Date.now()),
        ADDR_ATEL: 'Y',
        ADDR_AMAIL: 'Y',
        ADDR_ARENT: 'N',
        ADDR_ARNTT: 'N',
        ADDR_ARNTM: 'N',
        ADDR_ARTEM: 'N',
        ADDR_ASTAT: 1,
        ADDR_CRDAT: this.formatDateToAS400(Date.now()),
        ADDR_CRUID: userEmail,
      }

          );
    return insertAddress;
  }

  getCustomerAddressUpdate(webCartCustomerNumber, addressSequence,
    customerName, addressLine1, addressLine2, addressLine3, city, state, zipCode,
    country, email1, email2, userEmail) {
    const insertAddress = squel.update().table(this.getTable('T_ADDRESS'))
          .setFields(
      {
        ADDR_CMCD: this.companyNumber,
        ADDR_CSTCD: webCartCustomerNumber,
        ADDR_ADSQ: addressSequence,
        ADDR_PMSQ: '0',
        ADDR_CSTNM: customerName,
        ADDR_LINE1: addressLine1,
        ADDR_LINE2: addressLine2,
        ADDR_LINE3: addressLine3,
        ADDR_CTY_D: city,
        ADDR_LDESC: '',
        ADDR_LOCCD: state,
        ADDR_LCCCD: '',
        ADDR_PSTCD: zipCode,
        ADDR_CNTCD: country,
        ADDR_EML1: email1,
        ADDR_EML2: email2,
        ADDR_LMDT: this.formatDateToAS400(Date.now()),
        ADDR_ATEL: 'Y',
        ADDR_AMAIL: 'Y',
        ADDR_ARENT: 'N',
        ADDR_ARNTT: 'N',
        ADDR_ARNTM: 'N',
        ADDR_ARTEM: 'N',
        ADDR_ASTAT: 1,
        ADDR_CRDAT: this.formatDateToAS400(Date.now()),
        ADDR_CRUID: userEmail,
      })
      .where(`ADDR_ADSQ='${addressSequence}' and ADDR_CSTCD=${webCartCustomerNumber}`);
    return insertAddress;
  }
}

module.exports = AddressQueries;

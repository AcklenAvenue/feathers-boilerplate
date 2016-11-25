
/* eslint-disable */
const squel = require('squel');
const moment = require('moment');
const _ = require('lodash');

class CustomerQueries {
  constructor() {
    this.library = '';
    this.companyNumber = '';
  }

  formatDateToAS400(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSS');
  }

  getTable(tableName) {
    return `${this.library}.${tableName}`;
  }

  getCustomerHeaderInsert(webCartCustomerNumber, companyName, sicCode,
        taxId, customerNumberFromAS, userEmail) {
    const insertHeader = squel.insert()
          .into(this.getTable('T_CUSTOMER'))
          .set('CST_CMCD', this.companyNumber)
          .set('CST_NUM', webCartCustomerNumber)
          .set('CST_SEQ', 0)
          .set('CST_DESC', '')
          .set('CST_LDESC', companyName)
          .set('CST_COMMT', '')
          .set('CST_SICCD', sicCode)
          .set('CST_TAXID', taxId)
          .set('CST_DBRAT', null)
          .set('CST_FNUM', customerNumberFromAS)
          .set('CST_STS', '1')
          .set('CST_STRDT', this.formatDateToAS400(Date.now()))
          .set('CST_ENDDT', this.formatDateToAS400(Date.now()))
          .set('CST_LMDAT', this.formatDateToAS400(Date.now()))
          .set('CST_LMUID', userEmail)
          .set('CST_CRDAT', this.formatDateToAS400(Date.now()))
          .set('CST_CRUID', userEmail);

    return insertHeader;
  }

  getCustomerAddressInsert(webCartCustomerNumber, addressSequence,
    customerName, addressLine1, addressLine2, addressLine3, city, stateCode, zipCode,
    countryCode, email1, email2, userEmail) {
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
        ADDR_LOCCD: stateCode,
        ADDR_LCCCD: '',
        ADDR_PSTCD: zipCode,
        ADDR_CNTCD: countryCode,
        ADDR_EML1: email1,
        ADDR_EML2: email2,
        ADDR_LMDT: this.formatDateToAS400(Date.now()),
        ADDR_ATEL: 'N',
        ADDR_AMAIL: 'N',
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

  getCustomerHeaderUpdate(webCartCustomerNumber, companyName, sicCode,
        taxId, customerNumberFromAS, userEmail) {
    const updateHeader = squel.update()
          .table(this.getTable('T_CUSTOMER'))
          .set('CST_CMCD', this.companyNumber)
          .set('CST_NUM', webCartCustomerNumber)
          .set('CST_SEQ', 0)
          .set('CST_DESC', '')
          .set('CST_LDESC', companyName)
          .set('CST_COMMT', '')
          .set('CST_SICCD', sicCode)
          .set('CST_TAXID', taxId)
          .set('CST_DBRAT', null)
          .set('CST_FNUM', customerNumberFromAS)
          .set('CST_STS', '1')
          .set('CST_STRDT', this.formatDateToAS400(Date.now()))
          .set('CST_ENDDT', this.formatDateToAS400(Date.now()))
          .set('CST_LMDAT', this.formatDateToAS400(Date.now()))
          .set('CST_LMUID', userEmail)
          .set('CST_CRDAT', this.formatDateToAS400(Date.now()))
          .set('CST_CRUID', userEmail)
          .where(`CST_CMCD = '${this.companyNumber}' and CST_NUM = ${webCartCustomerNumber}`);

    return updateHeader;
  }

  getCustomerAddressUpdate(webCartCustomerNumber, addressSequence,
    customerName, addressLine1, addressLine2, addressLine3, city, stateCode, zipCode,
    countryCode, email1, email2, userEmail) {
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
        ADDR_LOCCD: stateCode,
        ADDR_LCCCD: '',
        ADDR_PSTCD: zipCode,
        ADDR_CNTCD: countryCode,
        ADDR_EML1: email1,
        ADDR_EML2: email2,
        ADDR_LMDT: this.formatDateToAS400(Date.now()),
        ADDR_ATEL: 'N',
        ADDR_AMAIL: 'N',
        ADDR_ARENT: 'N',
        ADDR_ARNTT: 'N',
        ADDR_ARNTM: 'N',
        ADDR_ARTEM: 'N',
        ADDR_ASTAT: 1,
        ADDR_CRDAT: this.formatDateToAS400(Date.now()),
        ADDR_CRUID: userEmail,
      })
      .where(`ADDR_ADSQ='${addressSequence}' and ADDR_CSTCD=${webCartCustomerNumber}`)
    return insertAddress;
  }

  notifyCustomerIsReady(customerNumber, addressSequenceNumber,
    date, time) {
    const sfactionInsert = squel.insert().into(this.getTable('SFACTION'))
          .setFields(

      {
        ONTYPE: 'REG',
        ONKEY1: this.companyNumber,
        ONKEY2: customerNumber,
        ONKEY3: addressSequenceNumber,
        ONDATE: date,
        ONTIME: time,
        ONPDAT: date,
        ONPTIM: time,
        ONASUF: '1',
      }

          );

    return sfactionInsert;
  }

  getExistingCustomerInformationQuery(lib, companyNo, inquisicartCustomerNumber) {
    this.library = lib;
    this.companyNumber = companyNo;
    return squel.select()
      .field('CST_NUM')
      .field('ADDR_ADSQ')
      .from(this.getTable('T_CUSTOMER'))
      .join(this.getTable('T_ADDRESS'), null, `ADDR_CSTCD = CST_NUM and ADDR_CMCD = CST_CMCD and CST_CMCD = '${companyNo}' and CST_NUM = ${inquisicartCustomerNumber}`)
      .toString();
  }

  getCustomerInsertOrUpdateQueries(lib, companyNo, customerInfo, userEmail, existingCustomerInformation) {
    this.library = lib;
    this.companyNumber = companyNo;
    var header = '';
    if (existingCustomerInformation && existingCustomerInformation.length > 0) {
      header = this.getCustomerHeaderUpdate(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
    } else {
      header = this.getCustomerHeaderInsert(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
    }

    const addresses = [];
    if (customerInfo.customerAddresses && customerInfo.customerAddresses.length > 0) {
      addresses = customerInfo.customerAddresses.map((address, index) => {
        const existingAddress = _.find(existingCustomerInformation, (record) => {
          return record.ADDR_ADSQ === index;
        })

        if (existingAddress) {
          return this.getCustomerAddressUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          `${address.firstName} ${address.lastName}`,
          address.addressLine1,
          address.addressLine2,
          address.addressLine3,
          address.city,
          address.stateCode,
          address.zipCode,
          address.countryCode,
          customerInfo.email,
          '',
          userEmail).toString();
        } else {
          return this.getCustomerAddressInsert(customerInfo.inquisicartCustomerNumber,
          index,
          `${address.firstName} ${address.lastName}`,
          address.addressLine1,
          address.addressLine2,
          address.addressLine3,
          address.city,
          address.stateCode,
          address.zipCode,
          address.countryCode,
          customerInfo.email,
          '',
          userEmail).toString();
        }


      });
    }

    var sfaction = undefined;

    if (customerInfo.customerAddresses && customerInfo.customerAddresses.length > 0) {
      sfaction = customerInfo.customerAddresses.map((address, index) => {
        return this.notifyCustomerIsReady(customerInfo.inquisicartCustomerNumber,
          index, moment().format('YYYYMMDD'), moment().format('HHmmss')).toString();
      });
    } else {
      sfaction = this.notifyCustomerIsReady(customerInfo.inquisicartCustomerNumber,
      customerInfo.addressSequenceNumber, moment().format('YYYYMMDD'), moment().format('HHmmss')).toString();
    }

    return [header].concat(addresses, sfaction);
  }
};

module.exports = CustomerQueries;

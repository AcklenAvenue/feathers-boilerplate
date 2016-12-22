
const squel = require('squel');
const moment = require('moment');
const _ = require('lodash');
const AddressQueries = require('./addressQueries');
const ContactQueries = require('./contactQueries');

class CustomerQueries {
  constructor() {
    this.library = '';
    this.companyNumber = '';
  }

  formatDateToAS400(date) { // eslint-disable-line class-methods-use-this
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

  getUpdateAddressesForProspect(customerInfo, userEmail) {
    return [
      this.addressQueries.getCustomerAddressUpdate(customerInfo.inquisicartCustomerNumber,
          0,
          customerInfo.companyName,
          '-',
          '',
          '',
          '',
          '',
          '',
          '',
          customerInfo.email,
          '',
        userEmail).toString()].concat(
        this.contactQueries.getCustomerContactUpdate(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '000',
          '000',
          '0000',
          '0000'),
          this.contactQueries.getCustomerContactRecordUpdate(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '').toString());
  }

  getInsertAddressesForProspect(customerInfo, userEmail) {
    return [
      this.addressQueries.getCustomerAddressInsert(customerInfo.inquisicartCustomerNumber,
          0,
          customerInfo.companyName,
          '-',
          '',
          '',
          '',
          '',
          '',
          '',
          customerInfo.email,
          '',
        userEmail).toString()].concat(
          this.contactQueries.getCustomerContactInsert(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '000',
          '000',
          '0000',
          '0000',
          customerInfo.email),
          this.contactQueries.getCustomerContactRecordInsert(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '').toString());
  }

  getUpdateAddressesForFullCustomer(customerInfo, address, index, userEmail,
    phoneNumber) {
    return [this.addressQueries.getCustomerAddressUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          `${address.firstName} ${address.lastName}`,
          address.addressLine1,
          address.addressLine2,
          address.addressLine3,
          address.city,
          address.state,
          address.zipCode,
          address.country,
          customerInfo.email,
          '',
          userEmail).toString()].concat(
          this.contactQueries.getCustomerContactUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          '',
          '',
          phoneNumber.substring(0, 3),
          phoneNumber.substring(phoneNumber.length - 4, phoneNumber.lenght),
          '',
          customerInfo.email),
          this.contactQueries.getCustomerContactRecordUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          address.lastName,
          address.firstName).toString());
  }

  getInsertAddressesForFullCustomer(customerInfo, index, address, userEmail, phoneNumber) {
    return [this.addressQueries.getCustomerAddressInsert(customerInfo.inquisicartCustomerNumber,
          index,
          `${address.firstName} ${address.lastName}`,
          address.addressLine1,
          address.addressLine2,
          address.addressLine3,
          address.city,
          address.state,
          address.zipCode,
          address.country,
          customerInfo.email,
          '',
          userEmail).toString()].concat(
          this.contactQueries.getCustomerContactInsert(customerInfo.inquisicartCustomerNumber,
          index,
          '',
          '',
          phoneNumber.substring(0, 3),
          phoneNumber.substring(phoneNumber.length - 4, phoneNumber.lenght),
          '',
          customerInfo.email),
          this.contactQueries.getCustomerContactRecordInsert(customerInfo.inquisicartCustomerNumber,
          index,
          address.lastName,
          address.firstName).toString());
  }

  getCustomerInsertOrUpdateQueries(lib, companyNo, customerInfo, userEmail,
  existingCustomerInformation) {
    this.library = lib;
    this.companyNumber = companyNo;
    this.addressQueries = new AddressQueries(this.library, this.companyNumber);
    this.contactQueries = new ContactQueries(this.library, this.companyNumber);

    let header = '';
    let addresses = [];
    if (existingCustomerInformation && existingCustomerInformation.length > 0) {
      header = this.getCustomerHeaderUpdate(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
      addresses = this.getUpdateAddressesForProspect(customerInfo, userEmail);
    } else {
      header = this.getCustomerHeaderInsert(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
      addresses = this.getInsertAddressesForProspect(customerInfo, userEmail);
    }
    if (customerInfo.customerAddresses && customerInfo.customerAddresses.length > 0) {
      addresses = customerInfo.customerAddresses.map((address, index) => {
        const existingAddress = _.find(existingCustomerInformation, record =>
        record.ADDR_ADSQ === index.toString());

        let phoneNumber = address.phoneNumber || '';
        phoneNumber = _.padStart(phoneNumber, 7, '0');
        if (existingAddress) {
          return this.getUpdateAddressesForFullCustomer(customerInfo,
            address, index, userEmail, phoneNumber);
        } else { // eslint-disable-line no-else-return
          return this.getInsertAddressesForFullCustomer(customerInfo,
            index, address, userEmail, phoneNumber);
        }
      });
    }

    let sfaction = [];

    if (customerInfo.customerAddresses && customerInfo.customerAddresses.length > 0) {
      sfaction = customerInfo.customerAddresses.map((address, index) =>
        this.notifyCustomerIsReady(customerInfo.inquisicartCustomerNumber,
          index, moment().format('YYYYMMDD'), moment().format('HHmmss')).toString()
      );
    } else {
      sfaction = [
        this.notifyCustomerIsReady(customerInfo.inquisicartCustomerNumber,
          customerInfo.addressSequenceNumber, moment().format('YYYYMMDD'), moment().format('HHmmss')).toString(),
      ];
    }

    return [header].concat(_.flatten(addresses), sfaction);
  }
}

module.exports = CustomerQueries;


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

    getCustomerContactInsert(webCartCustomerNumber, addressSequence,
      phoneCountryCode, phoneAreaCode, phoneFirstThree, phoneLastFour, phoneExtNumber, email) {
    const insertAddress1 = squel.insert().into(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 0,
        ADCM_CMMTH: 'PHONE1',
        ADCM_COMMT: '',
        ADCM_CTYCD: phoneCountryCode,
        ADCM_ARCD: phoneAreaCode,
        ADCM_EXCD: phoneFirstThree,
        ADCM_PHNUM: phoneLastFour,
        ADCM_EXT: phoneExtNumber,
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      });
    const insertAddress2 = squel.insert().into(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 1,
        ADCM_CMMTH: 'PHONE2',
        ADCM_COMMT: '',
        ADCM_CTYCD: '',
        ADCM_ARCD: '',
        ADCM_EXCD: '',
        ADCM_PHNUM: '',
        ADCM_EXT: '',
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      });
    const insertAddress3 = squel.insert().into(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 2,
        ADCM_CMMTH: 'EMAIL',
        ADCM_COMMT: '',
        ADCM_CTYCD: '',
        ADCM_ARCD: '',
        ADCM_EXCD: '',
        ADCM_PHNUM: '',
        ADCM_EXT: '',
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      });
    return [insertAddress1.toString(), insertAddress2.toString(), insertAddress3.toString()];
  }

getCustomerContactRecordInsert(webCartCustomerNumber, addressSequence,
    lastName, firstName) {
    const insertAddress = squel.insert().into(this.getTable('T_ADDR_CT'))
          .setFields(
      {
        ADRCT_COCD: this.companyNumber,
        ADRCT_CSCD: webCartCustomerNumber,
        ADRCT_ADSQ: addressSequence,
        ADRCT_ACSQ: 0,
        ADRCT_LNAM: lastName,
        ADRCT_SALU: '',
        ADRCT_FNAM: firstName,
        ADRCT_MNAM: '',
        ADRCT_SUFF: '',
        ADRCT_POSC: '',
        ADRCT_NICK: '',
        ADRCT_STS: '1',
        ADRCT_L_MD: this.formatDateToAS400(Date.now()),
        ADDRC_C_D: this.formatDateToAS400(Date.now())
      });
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
      .where(`ADDR_ADSQ='${addressSequence}' and ADDR_CSTCD=${webCartCustomerNumber}`)
    return insertAddress;
  }

    getCustomerContactUpdate(webCartCustomerNumber, addressSequence,
      phoneCountryCode, phoneAreaCode, phoneFirstThree, phoneLastFour, phoneExtNumber, email) {
    const insertAddress1 = squel.update().table(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 0,
        ADCM_CMMTH: 'PHONE1',
        ADCM_COMMT: '',
        ADCM_CTYCD: phoneCountryCode,
        ADCM_ARCD: phoneAreaCode,
        ADCM_EXCD: phoneFirstThree,
        ADCM_PHNUM: phoneLastFour,
        ADCM_EXT: phoneExtNumber,
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      })
      .where(`ADCM_ADSQ='${addressSequence}' and ADCM_CSTCD=${webCartCustomerNumber} and ADCM_ACMSQ=0`);
    const insertAddress2 = squel.update().table(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 1,
        ADCM_CMMTH: 'PHONE2',
        ADCM_COMMT: '',
        ADCM_CTYCD: '',
        ADCM_ARCD: '',
        ADCM_EXCD: '',
        ADCM_PHNUM: '',
        ADCM_EXT: '',
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      })
      .where(`ADCM_ADSQ='${addressSequence}' and ADCM_CSTCD=${webCartCustomerNumber} and ADCM_ACMSQ=1`);
    const insertAddress3 = squel.update().table(this.getTable('T_ADDRC_CM'))
          .setFields(
      {
        ADCM_CMCD: this.companyNumber,
        ADCM_CSTCD: webCartCustomerNumber,
        ADCM_ADSQ: addressSequence,
        ADCM_ADCSQ: 0,
        ADCM_ACMSQ: 2,
        ADCM_CMMTH: 'EMAIL',
        ADCM_COMMT: '',
        ADCM_CTYCD: '',
        ADCM_ARCD: '',
        ADCM_EXCD: '',
        ADCM_PHNUM: '',
        ADCM_EXT: '',
        ADCM_EML1: email,
        ADCM_EML2: '',
        ADCM_COMM: '',
        ADCM_STAT: 1,
        ADCM_LMD: this.formatDateToAS400(Date.now()),
        ADCM_CDAT: this.formatDateToAS400(Date.now()),
      })
      .where(`ADCM_ADSQ='${addressSequence}' and ADCM_CSTCD=${webCartCustomerNumber} and ADCM_ACMSQ=2`);
    return [insertAddress1.toString(), insertAddress2.toString(), insertAddress3.toString()];
  }

  getCustomerContactRecordUpdate(webCartCustomerNumber, addressSequence,
    lastName, firstName) {
    const insertAddress = squel.update().table(this.getTable('T_ADDR_CT'))
          .setFields(
      {
        ADRCT_COCD: this.companyNumber,
        ADRCT_CSCD: webCartCustomerNumber,
        ADRCT_ADSQ: addressSequence,
        ADRCT_ACSQ: 0,
        ADRCT_LNAM: lastName,
        ADRCT_SALU: '',
        ADRCT_FNAM: firstName,
        ADRCT_MNAM: '',
        ADRCT_SUFF: '',
        ADRCT_POSC: '',
        ADRCT_NICK: '',
        ADRCT_STS: '1',
        ADRCT_L_MD: this.formatDateToAS400(Date.now()),
        ADDRC_C_D: this.formatDateToAS400(Date.now())
      })
      .where(`ADRCT_ADSQ='${addressSequence}' and ADRCT_CSCD=${webCartCustomerNumber}`);
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
    var addresses = [];
    if (existingCustomerInformation && existingCustomerInformation.length > 0) {
      header = this.getCustomerHeaderUpdate(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
        addresses = [
        this.getCustomerAddressUpdate(customerInfo.inquisicartCustomerNumber,
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
        this.getCustomerContactUpdate(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '000',
          '000',
          '0000',
          '0000'),
          this.getCustomerContactRecordUpdate(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '').toString());
    } else {
      header = this.getCustomerHeaderInsert(customerInfo.inquisicartCustomerNumber,
        customerInfo.companyName, customerInfo.sicCode, customerInfo.taxId,
        customerInfo.customerNumberFromAS, userEmail).toString();
        addresses = [
        this.getCustomerAddressInsert(customerInfo.inquisicartCustomerNumber,
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
          this.getCustomerContactInsert(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '000',
          '000',
          '0000',
          '0000',
          customerInfo.email),
          this.getCustomerContactRecordInsert(customerInfo.inquisicartCustomerNumber,
          0,
          '',
          '').toString());
    }
    if (customerInfo.customerAddresses && customerInfo.customerAddresses.length > 0) {
      addresses = customerInfo.customerAddresses.map((address, index) => {
        const existingAddress = _.find(existingCustomerInformation, (record) => {
          return record.ADDR_ADSQ === index.toString();
        })
        var phoneNumber = address.phoneNumber || '';
        phoneNumber = _.padStart(phoneNumber, 7, '0');
        if (existingAddress) {
          return [this.getCustomerAddressUpdate(customerInfo.inquisicartCustomerNumber,
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
          this.getCustomerContactUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          '',
          '',
          phoneNumber.substring(0, 3),
          phoneNumber.substring(phoneNumber.length - 4, phoneNumber.lenght),
          '',
          customerInfo.email),
          this.getCustomerContactRecordUpdate(customerInfo.inquisicartCustomerNumber,
          index,
          address.lastName,
          address.firstName).toString());
        } else {
          return [this.getCustomerAddressInsert(customerInfo.inquisicartCustomerNumber,
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
          this.getCustomerContactInsert(customerInfo.inquisicartCustomerNumber,
          index,
          '',
          '',
          phoneNumber.substring(0, 3),
          phoneNumber.substring(phoneNumber.length - 4, phoneNumber.lenght),
          '',
          customerInfo.email),
          this.getCustomerContactRecordInsert(customerInfo.inquisicartCustomerNumber,
          index,
          address.lastName,
          address.firstName).toString());
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
      sfaction = [
        this.notifyCustomerIsReady(customerInfo.inquisicartCustomerNumber,
          customerInfo.addressSequenceNumber, moment().format('YYYYMMDD'), moment().format('HHmmss')).toString()
      ];
    }

    return [header].concat(_.flatten(addresses), sfaction);
  }
};

module.exports = CustomerQueries;

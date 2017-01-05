const squel = require('squel');
const moment = require('moment');

class ContactQueries {
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
        ADDRC_C_D: this.formatDateToAS400(Date.now()),
      });
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
        ADDRC_C_D: this.formatDateToAS400(Date.now()),
      })
      .where(`ADRCT_ADSQ='${addressSequence}' and ADRCT_CSCD=${webCartCustomerNumber}`);
    return insertAddress;
  }
}

module.exports = ContactQueries;

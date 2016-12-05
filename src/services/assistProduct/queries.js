const squel = require('squel');
const moment = require('moment');

class ProductQueries {
  constructor() {
    this.companyNumber = '';
    this.library = '';
  }
  getTable(tableName) {
    return `${this.library}.${tableName}`;
  }

  getSelectProductQuery(lib, companyNo, productCode) {
    this.library = lib;
    this.companyNumber = companyNo;
    return squel.select()
      .field('IAPRT#', 'assistCode')
      .field('IA101', 'name')
      .field('IA103', 'description')
      .from(this.getTable('ICPRTMIA'))
      .where(`IACOM#='${companyNo}'`)
      .where(`UPPER(IAPRT#)=UPPER('${productCode}')`)
      .where('IAWEBF = 1')
      .toString();
  }

  getSelectProductPriceQuery(lib, companyNo, productCode) {
    this.library = lib;
    this.companyNumber = companyNo;
    const formattedDate = moment().format('YYYYMMDD');
    const query = squel.select()
      .field('OJNTU$', 'ProductPrice')
      .from(this.getTable('OEPRCFOJ'))
      .where(`OJCOM#='${companyNo}'`)
      .where('OJPR$C=\'STD\'')
      .where(`UPPER(OJPRT#)=UPPER('${productCode}')`)
      .where(`OJEFCD <= ${formattedDate}`)
      .order('OJEFCD', false)
      .toString();
    return `${query} FETCH FIRST 1 ROWS ONLY`;
  }
}

module.exports = ProductQueries;

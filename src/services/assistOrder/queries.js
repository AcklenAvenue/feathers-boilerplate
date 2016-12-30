const squel = require('squel');
const moment = require('moment');

class OrderQueries {
  constructor() {
    this.companyNumber = '';
    this.library = '';
    this.merchantCode = '';
  }

  getHeaderInsert(orderNumber, customerNumber, orderNumberFromAS, currencyCode,
    orderAmount, tax, clientName, clientEmail) {
    const insertHeader = squel.insert()
        .into(this.getTable('T_ORD_HDR'))
        .set('ORDH_COMCD', this.companyNumber)
        .set('ORDH_ORDNM', orderNumber)
        .set('ORDH_STRCD', this.merchantCode)
        .set('ORDH_CSTNM', customerNumber)
        .set('ORDH_STSCD', 'COMP')
        .set('ORDH_NUMPT', null)
        .set('ORDH_CURCD', currencyCode)
        .set('ORDH_DESC', '')
        .set('ORDH_CMNT', '')
        .set('ORDH_LDESC', null)
        .set('ORDH_ORAMT', orderAmount)
        .set('ORDH_CNNAM', clientName)
        .set('ORDH_CNDET', '')
        .set('ORDH_ORDDT', this.formatDateToAS400(Date.now()))
        .set('ORDH_TXAMT', tax)
        .set('ORDH_PDESC', null)
        .set('ORDH_LPDSC', null)
        .set('ORDH_PCMNT', clientName)
        .set('ORDH_FORDN', orderNumberFromAS)
        .set('ORDH_STDAT', this.formatDateToAS400(Date.now()))
        .set('ORDH_ENDAT', this.formatDateToAS400(Date.now()))
        .set('ORDH_USER1', null)
        .set('ORDH_USER2', null)
        .set('ORDH_STS', '1')
        .set('ORDH_LMDAT', this.formatDateToAS400(Date.now()))
        .set('ORDH_LMUID', clientEmail)
        .set('ORDH_CRDAT', this.formatDateToAS400(Date.now()))
        .set('ORDH_CRUID', clientEmail);

    return insertHeader;
  }

  getOrderDetail(orderNumber, sequence, offerId, keyCode, customerNumber,
    shippingAddressSequence, productCode, unitOfMeasure, productQuantity,
    productValue, currencyCode, userEmail) {
    const insertOrderDetail = squel.insert().into(this.getTable('T_ORD_DTL'))
        .setFields(

      {
        ORDD_COMCD: this.companyNumber,
        ORDD_ORDNM: orderNumber,
        ORDD_SEQ: sequence,
        ORDD_STRCD: this.merchantCode,
        ORDD_OFRID: offerId,
        ORDD_KEYCD: keyCode,
        ORDD_PRDCD: productCode,
        ORDD_DESC: '',
        ORDD_LDESC: '',
        ORDD_UOMCD: unitOfMeasure,
        ORDD_ORDQT: productQuantity,
        ORDD_QTSHP: null,
        ORDD_LSTPR: productValue,
        ORDD_DSAMT: null,
        ORDD_EXPRC: productValue,
        ORDD_TXAMT: 0.0000,
        ORDD_EXAMT: null,
        ORDD_FRAMT: 0.0000,
        ORDD_CURCD: currencyCode,
        ORDD_RQDDT: null,
        ORDD_SCDLV: null,
        ORDD_SCSDT: null,
        ORDD_CARCD: null,
        ORDD_SHMCD: shippingService,
        ORDD_UPCCD: null,
        ORDD_STCD: 'COMP',
        ORDD_CCS: null,
        ORDD_PDTCD: null,
        ORDD_PTRCD: null,
        ORDD_PDLCD: null,
        ORDD_SHTRF: null,
        ORDD_CMNRF: '',
        ORDD_GFTCD: null,
        ORDD_BTADR: customerNumber,
        ORDD_BTSEQ: 0,
        ORDD_STADR: customerNumber,
        ORDD_STSEQ: shippingAddressSequence,
        ORDD_EUADR: customerNumber,
        ORDD_EUSEQ: 0,
        ORDD_USER1: null,
        ORDD_USER2: null,
        ORDD_STS: null,
        ORDD_LMDAT: this.formatDateToAS400(Date.now()),
        ORDD_LMUID: userEmail,
        ORDD_CRDAT: this.formatDateToAS400(Date.now()),
        ORDD_CRUID: userEmail,
      }

        );
    return insertOrderDetail;
  }

  getOrderPayment(orderNumber, paymentType, paymentNumber, paymentAmount,
    expirationDate, authorizationCode, authorizationCodeLength, authorizationDate,
    creditCardCVV) {
    const paymentInsert = squel.insert().into(this.getTable('T_ORDPYMTS'))
        .setFields(

      {
        ORPM_CMCD: this.companyNumber, // Company number
        ORPM_ORDNM: orderNumber,
        ORPM_PTYPE: paymentType, // Payment Type
        ORPM_PNUM: paymentNumber, // CC: Token, CHK: #, Ref: ???
        ORPM_DLRS: paymentAmount,
        ORPM_EXDT: expirationDate || '0001-01-01 00:00:00.000000', // CC: Exp Date, OTROS: 0001-01-01 00:00:00.000000
        ORPM_AUTHCD: authorizationCode || null, // CC: Authorization code, OTROS: VACIO
        ORPM_AUTHLN: authorizationCodeLength || 0, // CC: authorization code length, otros: vacio
        ORPM_AUTHDT: authorizationDate || null, // CC: auth date, otros: 0001-01-01 00:00:00.000000
        ORPM_CVV2: creditCardCVV || null, //
        ORPM_AVS: null,
        ORPM_ACI: null,
        ORPM_VLD: null,
        ORPM_RSPCD: '               ',
        ORPM_RSPMSG: '|                                                                                                   ',
      }

        );

    return paymentInsert;
  }

  notifyOrderIsReady(orderNumber, date, time) {
    const sfactionInsert = squel.insert().into(this.getTable('SFACTION'))
        .setFields(

      {
        ONTYPE: 'ORD',
        ONKEY1: this.companyNumber,
        ONKEY2: orderNumber,
        ONKEY3: '',
        ONDATE: date,
        ONTIME: time,
        ONPDAT: date,
        ONPTIM: time,
        ONASUF: '1',
      }

        );

    return sfactionInsert;
  }
  formatDateToAS400(date) { //eslint-disable-line
    return moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSS');
  }
  getTable(tableName) {
    return `${this.library}.${tableName}`;
  }
  getOrderInsertQueries(lib, companyNo, merchant, orderInfo, userEmail) {
    this.library = lib;
    this.companyNumber = companyNo;
    this.merchantCode = merchant;
    const headerQuery = this.getHeaderInsert(orderInfo.id, orderInfo.customerNumber,
      orderInfo.orderNumberFromAS, orderInfo.currencyCode, orderInfo.orderAmount,
      orderInfo.tax, orderInfo.clientName, userEmail).toString();
    const detailQueries = orderInfo.orderDetails.map(detail =>
      this.getOrderDetail(orderInfo.id, detail.sequence,
        detail.offerId, detail.keyCode, orderInfo.customerNumber,
        orderInfo.orderShippingAddress.assistSequence,
        detail.productCode, detail.unitOfMeasure, detail.productQuantity, detail.productValue,
    );
    const paymentQuery = this.getOrderPayment(orderInfo.id, orderInfo.orderPayment.paymentType,
      orderInfo.orderPayment.paymentNumber, orderInfo.orderPayment.paymentAmount,
      orderInfo.orderPayment.expirationDate, orderInfo.orderPayment.authorizationCode,
      orderInfo.orderPayment.authorizationCodeLength, orderInfo.orderPayment.authorizationDate,
      orderInfo.orderPayment.creditCardCVV).toString();
    const sfaction = this.notifyOrderIsReady(orderInfo.id, moment().format('YYYYMMDD'),
      moment().format('HHmmss')).toString();
    return [headerQuery].concat(detailQueries, paymentQuery, sfaction);
  }
}

module.exports = OrderQueries;

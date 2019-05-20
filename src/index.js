'use strict';

module.exports = {
  parseMessage: require('./parser/parseMessage'),
  parseRequest: require('./parser/parseRequest'),
  parseResponse: require('./parser/parseResponse'),
  serialize: require('./serializer/serialize'),
  dataTypes: require('./dataTypes.json'),
  DataTypesManager: require('./DataTypesManager'),
  UAVCANCodec: require('./UAVCANCodec.js'),
  UAVCANTransfer: require('./UAVCANTransfer.js'),
  prependCRC: require('./util/CRC').prependCRC,
  getData: require('./util/CRC').getData,
  validateCRC: require('./util/CRC').validateCRC
};

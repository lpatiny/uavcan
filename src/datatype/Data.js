'use strict';

const CRC = require('./util/CRC');
const serialize = require('./serializer/serialize');
const parse = require('./parser/parse');

/**
 * Create an instance an object containing uavcan data
 * {array|object} [data] a byte array or an object
 * {object} [dataTypeID] data type ID of full data type ID
 * {object} [options={}]
 * {boolean} [isService=false]
 * {boolean} [isRequest=false]
 * {boolean} [hasCRC=true] will check and remove CRC if data length is greater than 7
 */
class Data {
  constructor(data, dataTypeID, options = {}) {
    const { isService = false, isRequest = false, hasCRC = true } = options;
    if (Array.isArray(data) || Buffer.isBuffer(data)) {
      if (hasCRC) {
        getBytesFromCRCData(data, dataTypeID, isService, isRequest);
      } else {
        this.bytes = data;
      }
    } else {
      // expected to be an object
      getBytesFromObject(data, dataTypeID, isService, isRequest);
    }

    this.dataTypeID = dataTypeID;
    this.isService = isService;
    this.isRequest = isRequest;
  }

  toObject() {
    return parse(this.bytes, this.dataTypeID, this.isService, this.isRequest);
  }

  toBytesWithCRC() {
    return CRC.prependCRC(this.bytes, this.dataTypeID, this.isService);
  }
}

function getBytesFromObject(object, dataTypeID, isService, isRequest) {
  return serialize(object, dataTypeID, isService, isRequest);
}

function getBytesFromCRCData(bytes, dataTypeID, isService, isRequest) {
  if (!CRC.validateDataWithCRC(bytes, dataTypeID, isService, isRequest)) {
    throw Error('Wrong CRC');
  }

  return bytes.slice(2);
}

module.exports = Data;

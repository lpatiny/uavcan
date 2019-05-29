'use strict';

const { getDataType } = require('../DataTypesManager');

const processVariable = require('./processVariable');
/**
 *
 * @param {*} data Buffer
 * @param {*} dataType
 */
function parse(data, dataType, isService = false, isRequest = false) {
  if (Number.isInteger(dataType)) {
    dataType = getDataType(dataType, isService);
  }
  let bigValue;
  let from;

  if (typeof data === 'string') {
    bigValue = data ? BigInt(`0x${data}`) : BigInt(0);
    from = BigInt((data.length / 2) * 8);
  } else if (Array.isArray(data)) {
    bigValue =
      data.length > 0
        ? BigInt(`0x${Buffer.from(data).toString('hex')}`)
        : BigInt(0);
    from = BigInt(data.length * 8);
  } else if (Buffer.isBuffer(data)) {
    bigValue =
      data.length > 0 ? BigInt(`0x${data.toString('hex')}`) : BigInt(0);
    from = BigInt(data.length * 8);
  } else {
    throw new Error(
      'parse, data should be a hex string, buffer or uint8 array'
    );
  }

  let result = {};
  let transfer = {};
  if (!isService) {
    transfer = dataType.message;
  } else if (isService) {
    if (isRequest) {
      transfer = dataType.request;
    } else {
      transfer = dataType.response;
    }
  } else {
    throw new Error('parse: Not a service or message');
  }

  for (let variable of transfer.variables) {
    let currentResult = processVariable(bigValue, variable, from);
    if (variable.name) {
      result[variable.name] = currentResult.value;
      if (currentResult.valueStr !== undefined) {
        result[`${variable.name}Str`] = currentResult.valueStr;
      }
    }
    from = currentResult.from;
  }

  return result;
}

module.exports = parse;

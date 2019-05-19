'use strict';

const processVariable = require('./processVariable');
/**
 *
 * @param {*} data Buffer
 * @param {*} dataType
 */
function parse(data, dataType, isService = false, isRequest = false) {
  let bigValue;
  let from;

  if (typeof data === 'string') {
    bigValue = BigInt(`0x${data}`);
    from = BigInt((data.length / 2) * 8);
  } else if (Array.isArray(data)) {
    bigValue = BigInt(`0x${Buffer.from(data).toString('hex')}`);
    from = BigInt(data.length * 8);
  } else if (Buffer.isBuffer(data)) {
    bigValue = BigInt(`0x${data.toString('hex')}`);
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

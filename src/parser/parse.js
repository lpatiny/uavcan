'use strict';

/* global BigInt */

const processVariable = require('./processVariable');
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */
function parse(data, kind, isService = false, isRequest = false) {
  let buffer;

  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else if (Buffer.isBuffer(data)) {
    buffer = data;
  } else {
    throw new Error('parse, data should be a uint8 array');
  }

  let bigValue = BigInt(`0x${buffer.toString('hex')}`);

  let result = {};
  let from = BigInt(buffer.length * 8);

  let transfer = {};
  if (!isService) {
    transfer = kind.message;
  } else if (isService) {
    if (isRequest) {
      transfer = kind.request;
    } else {
      transfer = kind.response;
    }
  } else {
    throw new Error('parse: Not a service or message');
  }

  for (let variable of transfer.variables) {
    let currentResult = processVariable(bigValue, variable, from);
    if (variable.name) {
      result[variable.name] = currentResult.value;
      if (currentResult.valueStr) {
        result[variable.name + 'Str'] = currentResult.valueStr;
      }
    }
    from = currentResult.from;
  }

  return result;
}

module.exports = parse;

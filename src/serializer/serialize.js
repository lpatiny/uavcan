'use strict';

/* global BigInt */

const processVariable = require('./processVariable');
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */
function serialize(data, kind, isService = false, isRequest = false) {
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

  let bigResult = {
    value: BigInt(0),
    nbBits: 0
  };

  for (let variable of transfer.variables) {
    processVariable(data, variable, bigResult);
  }

  return bigIntToByteArray(bigResult);
}

function bigIntToByteArray(bigResult) {
  let rounded = bigResult.nbBits + 8 - ((bigResult.nbBits & 8) | 8);
  let result = [];
  for (let i = rounded - 8; i >= 0; i -= 8) {
    result.push(Number((bigResult.value >> BigInt(i)) & BigInt(255)));
  }
  return result;
}

module.exports = serialize;

'use strict';

const { getDataType } = require('../DataTypesManager');

const processVariable = require('./processVariable');

/**
 *
 * @param {object} object
 * @param {object} dataType
 */
function serialize(object, dataTypeID, isService = false, isRequest = false) {
  let dataType = getDataType(dataTypeID, isService);
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

  let bigResult = {
    value: BigInt(0),
    nbBits: 0
  };

  for (let variable of transfer.variables) {
    processVariable(object, variable, bigResult);
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

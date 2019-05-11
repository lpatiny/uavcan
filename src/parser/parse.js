'use strict';

/* global BigInt */

const Types = require('../CommunicationTypes');
const processVariable = require('./processVariable');
/**
 *
 * @param {Buffer} data
 * @param {object} messageKind: definition based on the messageKind
 * @param {number|string} communicationType: request, response or message
 */
function parse(data, messageKind, communicationType) {
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

  let variables = Types.getVariables(messageKind, communicationType);

  for (let variable of variables) {
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

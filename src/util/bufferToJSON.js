'use strict';

/* global BigInt */

const n1 = BigInt(1);
const n8 = BigInt(8);
const n255 = BigInt(255);

const { byteToFloat16 } = require('float16');

const kinds = require('../kinds.json');

/**
 *
 * @param {*} data
 * @param {*} kind
 */
function bufferToJSON(data, kind, isService = false, isRequest = false) {
  let buffer;
  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else {
    throw new Error('bufferToJSON, data should be a uint8 array');
  }
  let bigInt = BigInt(`0x${buffer.toString('hex')}`);
  let result = {};
  let from = BigInt(buffer.length * 8);

  let transfer = kind.message;
  if (isService && isRequest) transfer = kind.request;
  if (isService && !isRequest) transfer = kind.response;

  let unionPrefixed = 0;
  let extractedKind = 0;

  for (let variable of transfer.variables) {
    if (kinds[variable.kind] && kinds[variable.kind].type === 'message') {
      variable = kinds[variable.kind].message.variables[0];
    } else if (kinds[variable.kind] && kinds[variable.kind].type === 'union') {
      unionPrefixed = true;
    } else if (extractedKind) {
      unionPrefixed = false;
      // extract kind from union data received
      variable = kinds[variable.kind].message.variables[extractedKind];
    }

    from = processVariable(bigInt, variable, from, result);

    if (unionPrefixed) {
      extractedKind = result[variable.name];
    }
  }
  return result;
}

function processVariable(bigInt, variable, from, result) {
  let value;

  switch (variable.kind) {
    case 'void':
    case 'int':
      value = parseInt(bigInt, variable, from);
      from -= BigInt(variable.bits);
      break;
    case 'float':
      value = parseFloat(bigInt, variable, from);
      from -= BigInt(variable.bits);
      break;
    case 'intArray':
      value = [];
      for (let i = 0; i < variable.length; i++) {
        value.push(parseInt(bigInt, variable, from));
        from -= BigInt(variable.bits);
        if (from <= 0) break;
      }
      break;
    case 'floatArray':
      value = [];
      for (let i = 0; i < variable.length; i++) {
        value.push(parseFloat(bigInt, variable, from));
        from -= BigInt(variable.bits);
        if (from <= 0) break;
      }
      break;
    default:
      throw new Error(`Unknow variable kind: ${variable.kind}`);
  }

  result[variable.name] = value;
  return from;
}

function parseInt(bigInt, variable, from) {
  let nbBits = BigInt(variable.bits);
  let value;
  if (variable.unsigned) {
    let mask = (n1 << nbBits) - n1;
    value = (bigInt >> (from - nbBits)) & mask;
  } else {
    let mask = (n1 << (nbBits - n1)) - n1;
    let sign = (bigInt >> (from - n1)) & n1;
    value = (bigInt >> (from - nbBits)) & mask;
    if (sign) {
      value = -mask - n1 + value;
    }
  }
  if (variable.bits < BigInt(53)) {
    return Number(value); // can only store 53 bits in javascript for an integer
  } else {
    return value;
  }
}

// can only parse float16 and float32 and float64
function parseFloat(bigInt, variable, from) {
  if (![16, 32, 64].includes(variable.bits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  }
  // we will create a buffer
  let bytes = [];
  for (let i = 0; i < variable.bits / 8; i++) {
    bytes.push(Number((bigInt >> (from - n8)) & n255));
    from -= n8;
  }
  let buffer = Buffer.from(bytes);
  switch (variable.bits) {
    case 16:
      return byteToFloat16((bytes[0] << 8) | bytes[1]);
    case 32:
      return buffer.readFloatBE();
    case 64:
      return buffer.readDoubleBE();
    default:
      return undefined;
  }
}

module.exports = bufferToJSON;

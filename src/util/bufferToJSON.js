'use strict';

/* global BigInt */

const n1 = BigInt(1);
const n8 = BigInt(8);
const n255 = BigInt(255);

const decodeFloat16 = require('./decodeFloat16');

/**
 *
 * @param {*} data
 * @param {*} kind
 */
function bufferToJSON(data, kind) {
  let buffer;
  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else {
    throw new Error('bufferToJSON, data should be a uint8 array');
  }
  let bigInt = BigInt(`0x${buffer.toString('hex')}`);
  let result = {};
  let from = BigInt(buffer.length * 8);
  for (let variable of kind.variables) {
    from = processVariable(bigInt, variable, from, result);
  }
  return result;
}

function processVariable(bigInt, variable, from, result) {
  let value;
  switch (variable.kind) {
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
      return decodeFloat16((bytes[0] << 8) | bytes[1]);
    case 32:
      return buffer.readFloatBE();
    case 64:
      return buffer.readDoubleBE();
    default:
      return undefined;
  }
}

module.exports = bufferToJSON;

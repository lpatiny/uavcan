'use strict';

/* global BigInt */

const n1 = BigInt(1);
const n2 = BigInt(2);
const n0 = BigInt(0);
const n8 = BigInt(8);
const n255 = BigInt(255);
const n128 = BigInt(128);

const { byteToFloat16 } = require('float16');

const kinds = require('../kinds.json');

let called = 0;
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */
function bufferToJSON(data, kindReference, isService = false, isRequest = false) {
  let buffer;
  let kind = JSON.parse(JSON.stringify(kindReference));

  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else if (Buffer.isBuffer(data)) {
    buffer = data;
  } else {
    throw new Error('bufferToJSON, data should be a uint8 array');
  }

  let bigInt = BigInt(`0x${buffer.toString('hex')}`);

  let result = {};
  let from = BigInt(buffer.length * 8);

  let transfer = {};
  if (!isService) transfer = kind.message;
  if (isService && isRequest) transfer = kind.request;
  if (isService && !isRequest) transfer = kind.response;

  let unionDidPreceed = 0;
  let extractedUnionType = -1;
  let unionTagCount = 0;
  let voidCount = 0;
  let unionTagValueName = '';


  for (let variable of transfer.variables) {
    if (variable.kind === 'void') {
      variable.name = `${variable.kind}${voidCount}`;
      voidCount++;
    } else if (
      kinds[variable.kind] &&
      kinds[variable.kind].type === 'message'
    ) {
      variable = kinds[variable.kind].message.variables[0];
    } else if (kinds[variable.kind] && kinds[variable.kind].type === 'union') {
      unionDidPreceed = 1;
      variable.bits = Math.ceil(
        Math.log(kinds[variable.kind].message.variables.length) / Math.log(2)
      );
      unionTagValueName = variable.name;
      variable.name = `${variable.kind}${unionTagCount}`;
      variable.kind = 'unionTag'; // rename kind to explicit name. must succeed bit length calculation
      unionTagCount++;
    }
    from = processVariable(bigInt, variable, from, result);


    // very implicit, FIXME
    if (result.name) {
      result.nameStr = nameToString(result.name);
    }

    if (result.key) {
      result.keyStr = nameToString(result.key);
    }


    if (unionDidPreceed) {
      unionDidPreceed = 0;
      extractedUnionType = result[variable.name];

      let name = variable.name.substr(0, variable.name.length - 1);
      let unionType = kinds[name].message.variables[1];
      if (unionType.bits) {
        variable.bits = unionType.bits;
      } else {
        variable.bits = 0; // 0 on Empty type
      }
      variable.kind = unionType.kind;
      variable.name = unionTagValueName;

      from = processVariable(bigInt, variable, from, result);

      extractedUnionType = -1;
    }
  }
  return result;
}

function nameToString(name) {
  return String.fromCharCode.apply(String, name);
}

function processVariable(bigInt, variable, from, result) {
  let value;

  switch (variable.kind) {
    case 'Empty': // same as void but occupies 0 bits
    case 'void': // void is just padding and can contain anything. it is not actively read.
    case 'unionTag': // union tags are always unsigned integers. the value represents the index of the type to be used
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
      throw new Error(`Unknown variable kind: ${variable.kind}`);
  }

  result[variable.name] = value;
  return from;
}

function getTwosComplement(val, len) {
  if (len) {
    let mask = n2 ** (len - n1);
    return -(val & mask) + (val & ~mask);
  } else {
    return 0;
  }
}

function parseInt(bigInt, variable, from) {
  let nbBits = BigInt(variable.bits);
  let byteValue = n0;
  let value = BigInt(0);

  let i;
  for (i = n8; i <= nbBits; i = i + n8) {
    byteValue = (bigInt >> (from - i)) & n255;
    value = value | (byteValue << (i - n8));
  }

  if (!variable.unsigned && nbBits > 7) {
    value = getTwosComplement(value, nbBits);
  } else if (nbBits < 8) {
    // handle integers smaller than 8bits
    let wordValue = (bigInt >> (from - nbBits)) & BigInt(n2 ** nbBits - n1);
    value = getTwosComplement(wordValue, nbBits);
  }

  return Number(value);
  /* FUTURE, when json.stringify knows how to handle bigint
  if (variable.bits < 53) {
    return Number(value); // can only store 53 bits in javascript for an integer
  } else {
    return value;
  }
  */
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

'use strict';

/* global BigInt */

const kinds = require('../kinds.json');

const parseFloat = require('./parseFloat');
const parseInt = require('./parseInt');

const n1 = BigInt(1);

/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */
function bufferToJSON(data, kind, isService = false, isRequest = false) {
  let buffer;

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
  if (!isService) {
    transfer = kind.message;
  } else if (isService) {
    if (isRequest) {
      transfer = kind.request;
    } else {
      transfer = kind.response;
    }
  } else {
    throw new Error('bufferToJSON: Not a service or message');
  }

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
        Math.log2(kinds[variable.kind].message.variables.length)
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
      {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value = parseInt(currentValue, variable.bits, variable.unsigned);
        from -= BigInt(variable.bits);
      }
      break;
    case 'float':
      {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value = parseFloat(currentValue, variable.bits);
        from -= BigInt(variable.bits);
      }
      break;
    case 'intArray':
      value = [];
      for (let i = 0; i < variable.length; i++) {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value.push(parseInt(currentValue, variable.bits, variable.unsigned));
        from -= BigInt(variable.bits);
        if (from <= 0) break;
      }

      break;
    case 'floatArray':
      value = [];
      for (let i = 0; i < variable.length; i++) {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value.push(parseFloat(currentValue, variable.bits));
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

module.exports = bufferToJSON;

function getCurrentValue(bigInt, nbBits, from) {
  return (bigInt >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

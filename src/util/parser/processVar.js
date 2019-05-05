'use strict';

/* global BigInt */

const n1 = BigInt(1);
const parseFloat = require('./parseFloat');
const parseInt = require('./parseInt');

function processVar(bigInt, variable, from) {
  let value;
  switch (variable.kind) {
    case 'void': // void is just padding and can contain anything. it is not actively read.
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
    default:
      throw new Error(`Unknown variable kind: ${variable.kind}`);
  }
  return {
    value,
    from
  };
}

function getCurrentValue(bigValue, nbBits, from) {
  return (bigValue >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

module.exports = processVar;

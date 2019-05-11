'use strict';

/* global BigInt */

const kinds = require('../kinds.json');

const parseInt = require('./util/parseInt');
const processVar = require('./processVar');

const n1 = BigInt(1);

function processUnion(bigValue, variable, from) {
  let unionDefinition = kinds[variable.kind];
  let nbBits = Math.ceil(Math.log2(unionDefinition.message.variables.length));
  let variableKind = parseInt(
    getCurrentValue(bigValue, nbBits, from),
    nbBits,
    true
  );
  let unionVariable = unionDefinition.message.variables[variableKind];
  from -= BigInt(nbBits);
  let result = processVar(bigValue, unionVariable, from);
  let tmpValue = {};
  tmpValue[unionVariable.name] = result.value;
  result.value = tmpValue;
  return result;
}

function getCurrentValue(bigValue, nbBits, from) {
  return (bigValue >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

module.exports = processUnion;

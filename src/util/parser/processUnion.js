'use strict';

/* global BigInt */

const kinds = require('../../kinds.json');

const parseInt = require('./parseInt');
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
  return processVar(bigValue, unionVariable, from);
}

function getCurrentValue(bigValue, nbBits, from) {
  return (bigValue >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

module.exports = processUnion;

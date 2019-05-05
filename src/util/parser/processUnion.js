'use strict';

/* global BigInt */

const kinds = require('../../kinds.json');

const parseInt = require('./parseInt');
const processVar = require('./processVar');

function processUnion(bigInt, variable, from) {
  let unionDefinition = kinds[variable.kind];
  let nbBits = Math.ceil(Math.log2(unionDefinition.message.variables.length));
  let variableKind = parseInt(bigInt, nbBits, true);
  let unionVariable = unionDefinition.message.variables[variableKind];
  from += BigInt(nbBits);
  return processVar(bigInt, unionVariable, from);
}

module.exports = processUnion;

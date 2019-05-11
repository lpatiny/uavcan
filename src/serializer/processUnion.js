'use strict';

/* global BigInt */

const kinds = require('../kinds.json');

const parseInt = require('./util/serializeInt');
const processVar = require('./processVar');

const n1 = BigInt(1);

function processUnion(data, variable, bigResult) {
  let unionDefinition = kinds[variable.kind];
  let nbBits = Math.ceil(Math.log2(unionDefinition.message.variables.length));

  // we are now in trouble because we need to find which type we should use

  console.log(unionDefinition.message.variables);

  console.log({ data, variable, nbBits });

  let variableKind = parseInt(
    getCurrentValue(bigValue, nbBits, from),
    nbBits,
    true
  );
  let unionVariable = unionDefinition.message.variables[variableKind];
  from -= BigInt(nbBits);
  return processVar(data, variable, bigResult);
}

function getCurrentValue(bigValue, nbBits, from) {
  return (bigValue >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

module.exports = processUnion;

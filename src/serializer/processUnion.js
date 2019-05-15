'use strict';

/* global BigInt */

const kinds = require('../kinds.json');

const processVar = require('./processVar');

const n1 = BigInt(1);

function processUnion(data, variable, bigResult) {
  let unionDefinition = kinds[variable.kind];
  let variables = unionDefinition.message.variables;
  let nbBits = Math.ceil(Math.log2(variables.length));

  // we are now in trouble because we need to find which type we should use

  let type = Object.keys(data).sort((a, b) => a.length - b.length)[0];
  let index;
  for (let i = 0; i < variables.length; i++) {
    if (variables[i].name === type) {
      index = i;
      break;
    }
  }
  if (index === undefined) {
    throw Error(
      `Variable of unionDefinition not found: ${JSON.stringify(data)}`
    );
  }

  processVar(index, { kind: 'int', bits: nbBits, unsigned: true }, bigResult);
  processVar(data[variables[index].name], variables[index], bigResult);
}

function getCurrentValue(bigValue, nbBits, from) {
  return (bigValue >> (from - BigInt(nbBits))) & ((n1 >> BigInt(nbBits)) - n1);
}

module.exports = processUnion;
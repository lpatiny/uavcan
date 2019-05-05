'use strict';

const processVar = require('./processVar');
const processArray = require('./processArray');
const processUnion = require('./processUnion');
const processObject = require('./processObject');

function processVariable(bigInt, variable, from) {
  switch (variable.type) {
    case 'var':
      return processVar(bigInt, variable, from);
    case 'union':
      return processUnion(bigInt, variable, from);
    case 'object':
      return processObject(bigInt, variable, from);
    case 'array':
      return processArray(bigInt, variable, from);
    default:
      throw new Error(`Unknown variable kind: ${variable.kind}`);
  }
}

module.exports = processVariable;

'use strict';

const processVar = require('./processVar');
const processArray = require('./processArray');
const processUnion = require('./processUnion');
const processObject = require('./processObject');

function processVariable(bigValue, variable, from) {
  switch (variable.type) {
    case 'var':
      return processVar(bigValue, variable, from);
    case 'union':
      return processUnion(bigValue, variable, from);
    case 'object':
      return processObject(bigValue, variable, from);
    case 'array':
      return processArray(bigValue, variable, from);
    default:
      throw new Error(`Unknown variable kind: ${variable.kind}`);
  }
}

module.exports = processVariable;

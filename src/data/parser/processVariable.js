'use strict';

const processVar = require('./processVar');
const processArray = require('./processArray');
const processUnion = require('./processUnion');

function processVariable(bigValue, variable, from) {
  switch (variable.type) {
    case 'var':
      return processVar(bigValue, variable, from);
    case 'union':
      return processUnion(bigValue, variable, from);
    case 'message': // to deal with abstract datatypeID
    case 'object': {
      let processObject = require('./processObject'); // cyclic dependency !!!
      return processObject(bigValue, variable, from);
    }
    case 'array':
      return processArray(bigValue, variable, from);
    default:
      throw new Error(`Unknown variable dataType: ${variable.type}`);
  }
}

module.exports = processVariable;

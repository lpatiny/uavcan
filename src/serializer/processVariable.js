'use strict';

const processVar = require('./processVar');
//const processArray = require('./processArray');
//const processUnion = require('./processUnion');

function processVariable(data, variable, bigResult) {
  switch (variable.type) {
    case 'var':
      processVar(data, variable, bigResult);
      break;
    case 'union':
    //  return processUnion(data, variable, bigResult);
    case 'object':
      let processObject = require('./processObject');
      processObject(data[variable.name], variable, bigResult);
      break;
    case 'array':
    //  return processArray(bdata, variable, bigResult);
    default:
      throw Error(`Unknown variable kind: ${variable.kind}`);
  }
}

module.exports = processVariable;

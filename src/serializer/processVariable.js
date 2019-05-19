'use strict';

const processVar = require('./processVar');
const processArray = require('./processArray');
const processUnion = require('./processUnion');

function processVariable(data, variable, bigResult) {
  switch (variable.type) {
    case 'var':
      processVar(data[variable.name], variable, bigResult);
      break;
    case 'union':
      processUnion(data[variable.name], variable, bigResult);
      break;
    case 'message':
    case 'object':
      let processObject = require('./processObject');
      processObject(data[variable.name], variable, bigResult);
      break;
    case 'array':
      if (
        data[variable.name] === undefined &&
        data[`${variable.name}Str`] !== undefined
      ) {
        data[variable.name] = data[`${variable.name}Str`]
          .split(/(.)/)
          .filter((a) => a)
          .map((a) => a.charCodeAt(0));
      }
      processArray(data, variable, bigResult);
      break;
    default:
      throw Error(`Unknown variable kind: ${variable.kind}`);
  }
}

module.exports = processVariable;

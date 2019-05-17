'use strict';

const dataTypes = require('../dataTypes.json');

const processVariable = require('./processVariable');

function processObject(bigValue, variable, from) {
  let value = {};
  let variables = dataTypes[variable.kind].message
    ? dataTypes[variable.kind].message.variables
    : [];

  for (let variable of variables) {
    let currentResult = processVariable(bigValue, variable, from);
    if (variable.name) {
      value[variable.name] = currentResult.value;
      if (currentResult.valueStr) {
        value[`${variable.name}Str`] = currentResult.valueStr;
      }
    }
    from = currentResult.from;
  }

  return {
    value,
    from
  };
}

module.exports = processObject;

'use strict';

const dataTypes = require('../dataTypes.json');

const processVariable = require('./processVariable');

function processObject(data, variable, bigResult) {
  let variables = dataTypes[variable.kind].message.variables;

  for (let variable of variables) {
    processVariable(data, variable, bigResult);
  }
}

module.exports = processObject;

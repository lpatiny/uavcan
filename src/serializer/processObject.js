'use strict';

const kinds = require('../kinds.json');

const processVariable = require('./processVariable');

function processObject(data, variable, bigResult) {
  let variables = kinds[variable.kind].message.variables;

  for (let variable of variables) {
    processVariable(data, variable, bigResult);
  }
}

module.exports = processObject;

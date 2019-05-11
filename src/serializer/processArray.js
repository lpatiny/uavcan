'use strict';

/* global BigInt */

const processVar = require('./processVar');

function processArray(data, variable, bigResult) {
  // weither the variable name exists or we try to append 'Str'
  if (data[variable.name + 'Str']) {
    let encoder = new TextEncoder();
    data = encoder.encode(data[variable.name + 'Str']);
  } else {
    data = data[variable.name];
  }
  for (let i = 0; i < Math.min(variable.length, data.length); i++) {
    processVar(data[i], variable.kind, bigResult);
  }
}

module.exports = processArray;

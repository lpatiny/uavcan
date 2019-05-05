'use strict';

/* global BigInt */

const processVar = require('./processVar');

function processArray(bigInt, variable, from) {
  let value = [];
  for (let i = 0; i < variable.length; i++) {
    let currentValue = processVar(bigInt, variable.kind, from);
    value.push(currentValue.value);
    from = currentValue.from;
    if (from <= 0) break;
  }
  return { from, value };
}

module.exports = processArray;

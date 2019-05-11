'use strict';

const processVar = require('./processVar');

function processArray(bigInt, variable, from) {
  let value = [];
  for (let i = 0; i < variable.length; i++) {
    let currentValue = processVar(bigInt, variable.kind, from);
    value.push(currentValue.value);
    from = currentValue.from;
    if (from <= 0) break;
  }
  // is it an array of uint8 ?
  let type = variable.kind;
  let valueStr;
  if (type.kind === 'int' && type.unsigned === true && type.bits === 8) {
    valueStr = getValueStr(value);
  }
  return { from, value, valueStr };
}

function getValueStr(value) {
  return String.fromCharCode.apply(String, value);
}

module.exports = processArray;

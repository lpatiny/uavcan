'use strict';

const serializeInt = require('./util/serializeInt');
const serializeFloat = require('./util/serializeFloat');

function processVar(data, variable, bigResult) {
  switch (variable.kind) {
    case 'void':
      bigResult.value <<= BigInt(variable.bits);
      bigResult.nbBits += variable.bits;
      break;
    case 'int': {
      if (data === undefined) {
        throw Error(`Undefined variable: ${JSON.stringify(variable)}`);
      }
      let value = serializeInt(data, variable.bits, variable.unsigned);
      bigResult.value <<= BigInt(variable.bits);
      bigResult.value |= value;
      bigResult.nbBits += variable.bits;
      break;
    }
    case 'float':
      {
        if (data === undefined) {
          throw Error(`Undefined variable: ${JSON.stringify(variable)}`);
        }
        let value = serializeFloat(data, variable.bits, variable.unsigned);
        bigResult.value <<= BigInt(variable.bits);
        bigResult.value |= value;
        bigResult.nbBits += variable.bits;
      }
      break;
    default:
      throw new Error(`Unknown variable kind: ${variable.kind}`);
  }
}

module.exports = processVar;

'use strict';

/* global BigInt */


const processVariable = require('./processVariableprocessVariable');
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */
function bufferToJSON(data, kind, isService = false, isRequest = false) {
  let buffer;

  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else if (Buffer.isBuffer(data)) {
    buffer = data;
  } else {
    throw new Error('bufferToJSON, data should be a uint8 array');
  }

  let bigInt = BigInt(`0x${buffer.toString('hex')}`);

  let result = {};
  let from = BigInt(buffer.length * 8);

  let transfer = {};
  if (!isService) {
    transfer = kind.message;
  } else if (isService) {
    if (isRequest) {
      transfer = kind.request;
    } else {
      transfer = kind.response;
    }
  } else {
    throw new Error('bufferToJSON: Not a service or message');
  }

  let unionDidPreceed = 0;
  let extractedUnionType = -1;
  let unionTagCount = 0;
  let voidCount = 0;
  let unionTagValueName = '';

  for (let variable of transfer.variables) {
    let currentResult = processVariable(bigInt, variable, from);
    result[variable.name] = currentResult.value;
    from = currentResult.from;

    /*
    if (variable.kind === 'void') {
      variable.name = `${variable.kind}${voidCount}`;
      voidCount++;
    } else if (
      kinds[variable.kind] &&
      kinds[variable.kind].type === 'message'
    ) {
      variable = kinds[variable.kind].message.variables[0];
    } else if (kinds[variable.kind] && kinds[variable.kind].type === 'union') {
      unionDidPreceed = 1;
      variable.bits = Math.ceil(
        Math.log2(kinds[variable.kind].message.variables.length)
      );
      unionTagValueName = variable.name;
      variable.name = `${variable.kind}${unionTagCount}`;
      variable.kind = 'unionTag'; // rename kind to explicit name. must succeed bit length calculation
      unionTagCount++;
    }
    from = processVariable(bigInt, variable, from, result);
    // very implicit, FIXME
    if (result.name) {
      result.nameStr = nameToString(result.name);
    }

    if (result.key) {
      result.keyStr = nameToString(result.key);
    }

    if (unionDidPreceed) {
      unionDidPreceed = 0;
      extractedUnionType = result[variable.name];

      let name = variable.name.substr(0, variable.name.length - 1);
      let unionType = kinds[name].message.variables[1];
      if (unionType.bits) {
        variable.bits = unionType.bits;
      } else {
        variable.bits = 0; // 0 on Empty type
      }
      variable.kind = unionType.kind;
      variable.name = unionTagValueName;

      from = processVariable(bigInt, variable, from, result);

      extractedUnionType = -1;
    }
    */
  }

  return result;
}

function processObject(bigInt, variable, from) {}

function nameToString(name) {
  return String.fromCharCode.apply(String, name);
}

module.exports = bufferToJSON;

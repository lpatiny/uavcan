'use strict';

const fs = require('fs');
const { join } = require('path');

function getDataTypeSignatures() {
  let data = fs.readFileSync(join(__dirname, 'datatype_sig.txt'), 'utf8');

  let lines = data.split(/[\r\n]+/).slice(2);
  let result = {};
  for (let line of lines) {
    let fields = line.split(/ +/);
    if (fields.length >= 4) {
      result[fields[0]] = {
        dataTypeID: fields[1] === 'N/A' ? undefined : Number(fields[1]),
        hash: fields[2]
          .substring(2)
          .split(/(..)/)
          .filter((a) => a)
          .map((a) => Number(`0x${a}`)),
        maxBitsLength: Number(fields[3])
      };
    }
  }
  return result;
}

getDataTypeSignatures();

module.exports = getDataTypeSignatures;

'use strict';

const fs = require('fs');
const { join } = require('path');

function getDataType() {
  let data = fs.readFileSync(join(__dirname, 'datatype_sig.txt'), 'utf8');

  let lines = data.split(/[\r\n]+/).slice(2);
  let result = {};
  for (let line of lines) {
    let fields = line.split(/ +/);

    if (!isNaN(fields[1])) {
      result[fields[1]] = {
        id: fields[1],
        hash: fields[2].substring(2),
        maxBitsLength: Number(fields[3])
      };
    }
  }
  return result;
}

getDataType();

module.exports = getDataType;

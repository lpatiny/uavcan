'use strict';

const crccan = require('crc-can');

const { getDataTypeHash } = require('../DataTypesManager');

function checkCRC(bytes, crc, dataTypeLongID) {
  let hash = getDataTypeHash(dataTypeLongID);
  if (hash.length === 0) return false;
  let result = crccan(hash.concat(bytes));
  if (crc[0] === result >> 8 && (crc[1] === result) & 255) return true;
  console.log({ bytes, crc, hash, result, H: result >> 8, L: result & 255 });
  return false;
}

module.exports = checkCRC;

'use strict';

const crccan = require('crc-can');

const { getDataTypeHash } = require('../DataTypesManager');

/**
 *
 * @param {*} bytes
 * @param {*} crc
 * @param {*} dataTypeLongID
 */
function checkCRC(bytes, crc, dataTypeLongID) {
  let hash = getDataTypeHash(dataTypeLongID);
  if (hash.length === 0) return false;
  let result = crccan(hash.concat(bytes, crc.reverse()));
  return result === 0;
}

function getData(bytes) {
  if (bytes.length < 8) return bytes;
  return bytes.slice(2);
}

/**
 * validate the 2 first bytes of the data as CRC if over 7 b<tes
 * @param {*} bytes
 */
function validateCRC(bytes, dataTypeLongID) {
  if (bytes.length < 8) return true;
  let hash = getDataTypeHash(dataTypeLongID);
  if (hash.length === 0) throw Error(`Uknown dataTypeID: ${dataTypeLongID}`);
  let crc = bytes.slice(0, 2);
  let toProcess = hash.concat(bytes.slice(2));
  toProcess.push(crc[1], crc[0]);
  return crccan(toProcess) === 0;
}

/**
 * Prened the CRC to the data if required (over 7 bytes)
 * @param {*} bytes
 * @param {*} dataTypeLongID
 */
function prependCRC(bytes, dataTypeLongID) {
  if (bytes.length < 8) return bytes;
  let hash = getDataTypeHash(dataTypeLongID);
  if (hash.length === 0) throw Error(`Uknown dataTypeID: ${dataTypeLongID}`);
  let crc = crccan(hash.concat(bytes));
  bytes = bytes.slice(0);
  bytes.unshift(crc & 255, crc >> 8);
  return bytes;
}

module.exports = { getData, checkCRC, prependCRC, validateCRC };

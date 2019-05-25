'use strict';

const crccan = require('crc-can');

const { getDataTypeHash } = require('../DataTypesManager');

/**
 * Returns a byte array without the 2 first bytes if the length if over 7
 * @param {array} bytes
 */
function getBytesWithoutCRC(bytes) {
  if (bytes.length < 8) return bytes;
  return bytes.slice(2);
}

/**
 * validate the 2 first bytes of the data as CRC if over 7 b<tes
 * @param {*} bytes
 */
function checkCRC(bytes, dataTypeID, isService) {
  if (bytes.length < 8) return true;
  let hash = getDataTypeHash(dataTypeID, isService);
  if (hash.length === 0) throw Error(`Uknown dataTypeID: ${dataTypeID}`);
  let crc = bytes.slice(0, 2);
  let toProcess = hash.concat(bytes.slice(2));
  toProcess.push(crc[1], crc[0]);
  return crccan(toProcess) === 0;
}

/**
 * Prened the CRC to the data if required (over 7 bytes)
 * @param {*} bytes
 * @param {*} dataTypeFullID
 */
function prependCRC(bytes, dataTypeID, isService) {
  if (bytes.length < 8) return bytes;
  let hash = getDataTypeHash(dataTypeID, isService);
  if (hash.length === 0) throw Error(`Uknown dataTypeID: ${dataTypeID}`);
  let crc = crccan(hash.concat(bytes));
  bytes = bytes.slice(0);
  bytes.unshift(crc & 255, crc >> 8);
  return bytes;
}

module.exports = {
  getBytesWithoutCRC,
  prependCRC,
  checkCRC
};

'use strict';

function bytesToHex(bytes) {
  let text = '';
  for (let byte of bytes) {
    text += Number(byte & 255)
      .toString(16)
      .padStart(2, '0');
  }
  return text;
}

module.exports = bytesToHex;

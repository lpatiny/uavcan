'use strict';

/* global BigInt */

const { byteToFloat16 } = require('float16');

const n8 = BigInt(8);
const n255 = BigInt(255);

// can only parse float16 and float32 and float64
function parseFloat(bigInt, variable, from) {
  if (![16, 32, 64].includes(variable.bits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  }
  // we will create a buffer
  let bytes = [];
  for (let i = 0; i < variable.bits / 8; i++) {
    bytes.push(Number((bigInt >> (from - n8)) & n255));
    from -= n8;
  }
  let buffer = Buffer.from(bytes);
  switch (variable.bits) {
    case 16:
      return byteToFloat16((bytes[1] << 8) | bytes[0]);
    case 32:
      return buffer.readFloatLE();
    case 64:
      return buffer.readDoubleLE();
    default:
      return undefined;
  }
}

module.exports = parseFloat;

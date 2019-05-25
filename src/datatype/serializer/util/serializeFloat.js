'use strict';


const { float16ToByte } = require('float16');

const n0 = BigInt(0);

// can only parse float16 and float32 and float64
function serializeFloat(value, nbBits) {
  if (![16, 32, 64].includes(nbBits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  }

  switch (nbBits) {
    case 16: {
      let result = float16ToByte(value);
      return BigInt((result >> 8) | ((result & 255) << 8));
    }
    case 32: {
      let buffer = Buffer.from(new Array(4));
      buffer.writeFloatBE(value);
      let result = n0;
      for (let i = 0; i < 4; i++) {
        result += BigInt(buffer[i]) << BigInt(i * 8);
      }
      return result;
    }
    case 64: {
      let buffer = Buffer.from(new Array(8));
      buffer.writeDoubleBE(value);
      let result = n0;
      for (let i = 0; i < 8; i++) {
        result += BigInt(buffer[i]) << BigInt(i * 8);
      }
      return result;
    }
    default:
      return undefined;
  }
}

module.exports = serializeFloat;

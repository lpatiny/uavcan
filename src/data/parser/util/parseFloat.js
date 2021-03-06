'use strict';


const { byteToFloat16 } = require('float16');

const n8 = BigInt(8);
const n255 = BigInt(255);

// can only parse float16 and float32 and float64
function parseFloat(original, nbBits) {
  if (![16, 32, 64].includes(nbBits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  }
  // we will create a buffer
  let bytes = [];
  for (let i = 0; i < nbBits / 8; i++) {
    bytes.unshift(Number(original & n255));
    original >>= n8;
  }

  let buffer = Buffer.from(bytes);
  switch (nbBits) {
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

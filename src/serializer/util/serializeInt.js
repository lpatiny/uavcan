'use strict';


/*
  Can be an arbitrary length integer
  Can be signed or unsigned
  This method will do capping and encode as little endian
*/

const n0 = BigInt(0);
const n1 = BigInt(1);
const n8 = BigInt(8);
const n255 = BigInt(255);

function serializeInt(value, nbBits, unsigned = false) {
  value = BigInt(value);
  if (unsigned) {
    let maxValue = (n1 << BigInt(nbBits)) - n1;
    if (value > maxValue) value = maxValue;
    if (value < n0) value = n0;
    return littleEndian(value, nbBits);
  }
  // signed
  if (value >= n0) {
    let maxValue = (n1 << BigInt(nbBits - 1)) - n1;
    if (value > maxValue) value = maxValue;
    return littleEndian(value, nbBits);
  }
  // negative number
  const minValue = (n1 << (BigInt(nbBits) - n1)) * -n1;
  if (value < minValue) value = minValue;

  return littleEndian(value & ((n1 << BigInt(nbBits)) - n1), nbBits);
}

function littleEndian(value, nbBits) {
  value = BigInt(value);
  if (nbBits < 9) return value;
  // bits 0 to 7 is the first byte
  let result = n0;
  for (let i = 0; i < nbBits; i += 8) {
    let slotSize = BigInt(nbBits - i);
    result <<= slotSize < n8 ? slotSize : n8;
    result |= value & n255;
    value >>= n8;
  }
  return result;
}

module.exports = serializeInt;

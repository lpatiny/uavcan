'use strict';


const n0 = BigInt(0);
const n1 = BigInt(1);
const n2 = BigInt(2);
const n3 = BigInt(3);
const n8 = BigInt(8);
const n255 = BigInt(255);

/*
  Can be an arbitrary length integer
*/

function parseInt(original, nbBits, unsigned) {
  nbBits = BigInt(nbBits);
  // in the value we should now deal with spanning on 2 bytes like
  // 01000100 0110xxxx (12 bits integer) knowing that encoding is Little Endian
  // we initialize the value with the last bits (from 1 to 8 bits)

  // need to round to 8 bits
  let closest8 = ((nbBits - n1) >> n3) << n3;
  let value = original & ((n1 << (nbBits - closest8)) - n1);

  original >>= nbBits - closest8;
  // console.log({ bigInt, nbBits, original, from, closest8, value });
  // we need to invert the bytes and create the correct mask on the last one
  for (let i = n8; i < nbBits; i += n8) {
    value <<= n8;
    value |= original & n255;
    original >>= n8;
  }

  if (!unsigned) {
    value = getTwosComplement(value, nbBits);
  }

  return Number(value);
  /* FUTURE, when json.stringify knows how to handle bigint
    if (variable.bits < 53) {
      return Number(value); // can only store 53 bits in javascript for an integer
    } else {
      return value;
    }
    */
}

function getTwosComplement(val, len) {
  if (len) {
    let mask = n2 ** (len - n1);
    return -(val & mask) + (val & ~mask);
  } else {
    return 0;
  }
}

module.exports = parseInt;

'use strict';

/* global BigInt */

const parseFloat = require('../parseFloat');

describe('parseFloat ', () => {
  it('float16 0x003c', () => {
    let result = parseFloat(
      BigInt('0x003c'),
      {
        bits: 16
      },
      BigInt(16) // from contains the first bit to consider
    );
    expect(result).toBe(1);
  });

  it('float32 0x0000803f', () => {
    let result = parseFloat(
      BigInt('0x0000803f'),
      {
        bits: 32
      },
      BigInt(32) // from contains the first bit to consider
    );
    expect(result).toBe(1);
  });

  it('float64 0x0000 0000 0000 f03f', () => {
    let result = parseFloat(
      BigInt('0x000000000000f03f'),
      {
        bits: 64
      },
      BigInt(64) // from contains the first bit to consider
    );
    expect(result).toBe(1);
  });
});

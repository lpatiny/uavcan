'use strict';

/* global BigInt */

const parseInt = require('../parseInt');

describe('parseInt ', () => {
  it('uint8 0x00', () => {
    let result = parseInt(
      BigInt('0x00'),
      {
        bits: 8,
        unsigned: true
      },
      BigInt(8) // from contains the first bit to consider
    );
    expect(result).toBe(0);
  });

  it('uint8 0xFF', () => {
    let result = parseInt(
      BigInt('0xFF'),
      {
        bits: 8,
        unsigned: true
      },
      BigInt(8) // from contains the first bit to consider
    );

    expect(result).toBe(255);
  });

  it('uint8 0x00 0xFF 0x00', () => {
    let result = parseInt(
      BigInt('0x00FF00'),
      {
        bits: 8,
        unsigned: true
      },
      BigInt(16) // from contains the first bit to consider
    );

    expect(result).toBe(255);
  });

  it('uint8 0x00 0x0F 0xF0', () => {
    let result = parseInt(
      BigInt('0x000FF0'),
      {
        bits: 8,
        unsigned: true
      },
      BigInt(12) // from contains the first bit to consider
    );

    expect(result).toBe(255);
  });

  it('uint12 0x00 0xF0 0xF0', () => {
    let result = parseInt(
      BigInt('0x00F0F0'),
      {
        bits: 12,
        unsigned: true
      },
      BigInt(16) // from contains the first bit to consider
    );
    expect(result).toBe(0xff0);
  });

  it('uint4 0xFF 0xDF 0xFF', () => {
    let result = parseInt(
      BigInt('0xFFDFFF'),
      {
        bits: 4,
        unsigned: true
      },
      BigInt(16) // from contains the first bit to consider
    );
    expect(result).toBe(0x0d);
  });

  it('uint4 0x03 0xC0 0x00', () => {
    let result = parseInt(
      BigInt('0x03C000'),
      {
        bits: 4,
        unsigned: true
      },
      BigInt(18) // from contains the first bit to consider
    );
    expect(result).toBe(0x0f);
  });

  it('int4 0x03 0xC0 0x00', () => {
    let result = parseInt(
      BigInt('0x03C000'),
      {
        bits: 4,
        unsigned: false
      },
      BigInt(18) // from contains the first bit to consider
    );
    expect(result).toBe(-1);
  });

  it('int1 0x00 0x80 0x00', () => {
    let result = parseInt(
      BigInt('0x008000'),
      {
        bits: 1,
        unsigned: true
      },
      BigInt(16) // from contains the first bit to consider
    );
    expect(result).toBe(1);
  });
});

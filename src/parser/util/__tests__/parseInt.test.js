'use strict';

/* global BigInt */

const parseInt = require('../parseInt');

describe('parseInt ', () => {
  it('uint8 0x00', () => {
    let result = parseInt(BigInt('0x00'), 8, true);
    expect(result).toBe(0);
  });

  it('uint8 0xFF', () => {
    let result = parseInt(BigInt('0xFF'), 8, true);

    expect(result).toBe(255);
  });

  it('uint12 0x00 0xF0 0xF0', () => {
    let result = parseInt(BigInt('0xF0F'), 12, true);
    expect(result).toBe(0xff0);
  });

  it('uint4 0x5', () => {
    let result = parseInt(BigInt('0x5'), 4, true);
    expect(result).toBe(0x05);
  });

  it('int4 0xF', () => {
    let result = parseInt(BigInt('0xF'), 4, false);
    expect(result).toBe(-1);
  });

  it('int1 0x00 0x80 0x00', () => {
    let result = parseInt(BigInt('0x01'), 1, true);
    expect(result).toBe(1);
  });
});

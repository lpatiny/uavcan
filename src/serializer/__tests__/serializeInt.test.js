'use strict';

/* global BigInt */

const serializeInt = require('../serializeInt');

describe('serializeInt ', () => {
  it('unsigned 3 bits', () => {
    expect(serializeInt(0, 3, true)).toBe(BigInt(0));
    expect(serializeInt(-1, 3, true)).toBe(BigInt(0));
    expect(serializeInt(7, 3, true)).toBe(BigInt(7));
    expect(serializeInt(8, 3, true)).toBe(BigInt(7));
  });

  it('signed 3 bits', () => {
    expect(serializeInt(0, 3, false)).toBe(BigInt(0b000));
    expect(serializeInt(1, 3, false)).toBe(BigInt(0b001));
    expect(serializeInt(2, 3, false)).toBe(BigInt(0b010));
    expect(serializeInt(3, 3, false)).toBe(BigInt(0b011));
    expect(serializeInt(4, 3, false)).toBe(BigInt(0b011));
    expect(serializeInt(-1, 3, false)).toBe(BigInt(0b111));
    expect(serializeInt(-2, 3, false)).toBe(BigInt(0b110));
    expect(serializeInt(-3, 3, false)).toBe(BigInt(0b101));
    expect(serializeInt(-4, 3, false)).toBe(BigInt(0b100));
    expect(serializeInt(-5, 3, false)).toBe(BigInt(0b100));
  });

  it('unsigned large numbers', () => {
    expect(serializeInt(0b001100111100, 12, true)).toBe(BigInt(0b001111000011));
    expect(serializeInt(0b1010101011110000, 16, true)).toBe(
      BigInt(0b1111000010101010)
    );
    expect(serializeInt(0b1010101011110000, 32, true)).toBe(
      BigInt(0b1111000010101010)
    );
    expect(serializeInt(0b1010101011110000, 64, true)).toBe(
      BigInt(0b1111000010101010)
    );
  });
});

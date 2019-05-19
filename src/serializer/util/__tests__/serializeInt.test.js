'use strict';


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

  it('unsigned 32 bits', () => {
    expect(serializeInt(0x0000ffff, 32, true)).toBe(BigInt(0xffff0000));
  });

  it('signed 32 bits', () => {
    expect(serializeInt(-1, 32, false)).toBe(BigInt(0xffffffff));
  });

  it('unsigned 48 bits', () => {
    expect(serializeInt(0x0f0f0000ffff, 48, true)).toBe(BigInt(0xffff00000f0f));
  });

  // you need to use BigInt for the value if value over 53 bits !!!
  it('unsigned 64 bits', () => {
    expect(serializeInt(BigInt('0x0f0f00ff0000ffff'), 64, true)).toBe(
      BigInt('0xffff0000ff000f0f')
    );
  });

  it('signed 64 bits', () => {
    expect(serializeInt(BigInt(-65536), 64, false)).toBe(
      BigInt('0x0000ffffffffffff')
    );
  });

  it('unsigned large numbers', () => {
    expect(serializeInt(0b001100111100, 12, true)).toBe(BigInt(0b001111000011));
    expect(serializeInt(0b1010101011110000, 16, true)).toBe(
      BigInt(0b1111000010101010)
    );

    expect(serializeInt(0b1010101011110000, 17, true)).toBe(
      BigInt(0b11110000101010100)
    );
  });
});

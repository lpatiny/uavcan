'use strict';


const parseFloat = require('../parseFloat');

describe('parseFloat ', () => {
  it('float16 0x003c', () => {
    let result = parseFloat(BigInt('0x003c'), 16);
    expect(result).toBe(1);
  });

  it('float32 0x0000803f', () => {
    let result = parseFloat(BigInt('0x0000803f'), 32);
    expect(result).toBe(1);
  });

  it('float64 0x0000 0000 0000 f03f', () => {
    let result = parseFloat(BigInt('0x000000000000f03f'), 64);
    expect(result).toBe(1);
  });
});

'use strict';


const serializeFloat = require('../serializeFloat');

describe('serializeFloat ', () => {
  it('float16 0x003c', () => {
    let result = serializeFloat(1, 16);
    expect(result).toBe(BigInt('0x003c'));
  });

  it('float32 0x0000803f', () => {
    let result = serializeFloat(1, 32);
    expect(result).toBe(BigInt('0x0000803f'));
  });

  it('float64 0x0000 0000 0000 f03f', () => {
    let result = serializeFloat(1, 64);
    expect(result).toBe(BigInt('0x000000000000f03f'));
  });
});

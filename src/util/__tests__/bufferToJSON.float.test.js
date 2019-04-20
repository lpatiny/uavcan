'use strict';

const bufferToJSON = require('../bufferToJSON');

const float = require('./device/float');

describe('bufferToJSON float', () => {
  it('0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00', () => {
    let data = [
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00
    ];
    let result = bufferToJSON(data, float);
    expect(result).toStrictEqual({
      float16: 0,
      float32: 0,
      float64: 0
    });
  });

  it('0x00, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF', () => {
    let data = [
      0x3c,
      0x00,
      0x3f, // https://www.h-schmidt.net/FloatConverter/IEEE754.html
      0x80,
      0x00,
      0x00,
      0x3f, // http://www.binaryconvert.com/result_double.html?decimal=049
      0xf0,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00
    ];
    let result = bufferToJSON(data, float);
    expect(result).toStrictEqual({
      float16: 1,
      float32: 1,
      float64: 1
    });
  });
});

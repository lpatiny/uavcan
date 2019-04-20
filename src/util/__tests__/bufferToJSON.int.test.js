'use strict';

const bufferToJSON = require('../bufferToJSON');

const integer = require('./device/integer');

describe('bufferToJSON int', () => {
  it('0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00', () => {
    let data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    let result = bufferToJSON(data, integer);
    expect(result).toStrictEqual({
      uint4: 0,
      int4: 0,
      uint8: 0,
      int8: 0,
      uint16: 0,
      int16: 0
    });
  });
  it('0b10001000, 0x80, 0x80, 0x01, 0x01, 0x01, 0x01', () => {
    let data = [0b10001000, 0x80, 0x80, 0x01, 0x01, 0x01, 0x01];
    let result = bufferToJSON(data, integer);
    expect(result).toStrictEqual({
      uint4: 8,
      int4: -8,
      uint8: 128,
      int8: -128,
      uint16: 257,
      int16: 257
    });
  });
  it('0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF', () => {
    let data = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    let result = bufferToJSON(data, integer);
    expect(result).toStrictEqual({
      uint4: 15,
      int4: -1,
      uint8: 255,
      int8: -1,
      uint16: 65535,
      int16: -1
    });
  });
});

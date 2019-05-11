'use strict';

const parse = require('../parse');

const integer = require('./device/integer');

describe('parse int', () => {
  it('zero', () => {
    let data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    let result = parse(data, integer);
    expect(result).toStrictEqual({
      uint4: 0,
      int4: 0,
      uint8: 0,
      int8: 0,
      uint16: 0,
      int16: 0
    });
  });
  it('generic', () => {
    let data = [0x00, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00];
    let result = parse(data, integer);
    expect(result).toStrictEqual({
      uint4: 0,
      int4: 0,
      uint8: 1,
      int8: 1,
      uint16: 1,
      int16: 0
    });
  });
  it('one', () => {
    let data = [0b01011001, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    let result = parse(data, integer);
    expect(result).toStrictEqual({
      uint4: 5,
      int4: -7,
      uint8: 255,
      int8: -1,
      uint16: 65535,
      int16: -1
    });
  });
});

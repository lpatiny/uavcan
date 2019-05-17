'use strict';

const parse = require('../parse');
const kinds = require('../../dataTypes.json');

let kindGetSet = kinds['uavcan.protocol.param.GetSet'];

describe('parse testGetSet', () => {
  it('request', () => {
    let data = [
      0b00000001, // 8bits of index
      0b00000001, // next 5bits of index, then 3bits of uniontag value
      123, // since uniontag = 1, this value is an int64
      0,
      0,
      0,
      0,
      0,
      0,
      0, // last byte of int64
      0x64, // =d beginning of string
      0x72, // =r
      0x69, // =i
      0x76, // =v
      0x65, // =e
      0x72, // =r
      0x73 // =s
    ];

    let result = parse(data, kindGetSet, true, true);
    expect(result).toStrictEqual({
      index: 1,
      value: { integerValue: 123 },
      name: [100, 114, 105, 118, 101, 114, 115],
      nameStr: 'drivers'
    });
  });
  it('response', () => {
    let data = [
      0b00000001,
      0b11111111,
      0b00000011,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
      0xff,
      0x03,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x64, // =d beginning of string
      0x72, // =r
      0x69, // =i
      0x76, // =v
      0x65, // =e
      0x72, // =r
      0x73 // =s
    ];

    let result = parse(data, kindGetSet, true, false);

    expect(result).toStrictEqual({
      value: { integerValue: 1023 },
      defaultValue: { integerValue: 0 },
      maxValue: { integerValue: 1023 },
      minValue: { integerValue: 0 },
      name: [100, 114, 105, 118, 101, 114, 115],
      nameStr: 'drivers'
    });
  });
});

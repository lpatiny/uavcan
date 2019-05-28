'use strict';

const parse = require('../parse');

const testArray = require('./device/integerArray.json');

describe('parse intArray', () => {
  it('device test1 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00', () => {
    let data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    let result = parse(data, testArray, false, false);

    expect(result.arrayUint4).toStrictEqual([0, 0, 0]);
    expect(result.arrayInt4).toStrictEqual([0, 0, 0]);
    expect(result.arrayUint8).toStrictEqual([0, 0, 0, 0, 0]);
  });
  it('device test1 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF', () => {
    let data = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    let result = parse(data, testArray, false, false);

    expect(result).toStrictEqual({
      arrayUint4: [15, 15, 15],
      arrayInt4: [-1, -1, -1],
      arrayUint8: [255, 255, 255, 255, 255],
      arrayUint8Str: 'ÿÿÿÿÿ'
    });
  });
});

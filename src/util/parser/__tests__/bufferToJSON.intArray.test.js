'use strict';

const bufferToJSON = require('../bufferToJSON');

const testArray = require('./device/integerArray');

describe('bufferToJSON intArray', () => {
  it('device test1 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00', () => {
    let data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    let result = bufferToJSON(data, testArray, false, false);
    expect(result).toStrictEqual({
      arrayUint4: [0, 0, 0],
      arrayInt4: [0, 0, 0],
      arrayUint8: [0, 0, 0, 0, 0]
    });
  });
  it('device test1 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF', () => {
    let data = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    let result = bufferToJSON(data, testArray, false, false);
    expect(result).toStrictEqual({
      arrayUint4: [15, 15, 15],
      arrayInt4: [-1, -1, -1],
      arrayUint8: [255, 255, 255, 255, 255]
    });
  });
});
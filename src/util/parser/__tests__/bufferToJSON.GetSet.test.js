'use strict';

const bufferToJSON = require('../bufferToJSON');

const testGetSet = require('./device/getSet');

describe('bufferToJSON testGetSet response', () => {
  it('device test1 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00', () => {
    let data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    let result = bufferToJSON(data, testGetSet, true, false);
    expect(result).toStrictEqual({
      arrayUint4: [0, 0, 0],
      arrayInt4: [0, 0, 0],
      arrayUint8: [0, 0, 0, 0, 0]
    });
  });
});

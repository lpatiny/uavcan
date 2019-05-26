'use strict';

const parseUavcanFrame = require('../parseFrame');

describe('parseUavcanFrame', () => {
  it('1801550c f15f0100000000df', () => {
    let result = parseUavcanFrame(Number('0x1801550c'), [
      0xf1,
      0x5f,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0xdf
    ]);

    expect(result).toStrictEqual({
      priority: 24,
      isService: false,
      sourceNodeID: 12,
      dataTypeID: 341,
      dataLength: 7,
      data: [241, 95, 1, 0, 0, 0, 0],
      startTransfer: 1,
      endTransfer: 1,
      toggleBit: 0,
      transferID: 31
    });
  });
});

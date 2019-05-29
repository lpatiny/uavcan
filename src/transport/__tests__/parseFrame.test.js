'use strict';

const parseFrame = require('../parseFrame');

describe('parseFrame', () => {
  it('1801550c f15f0100000000df', () => {
    let result = parseFrame(Number('0x1801550c'), [
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
      frameID: 402740492,
      dataTypeID: 341,
      bytes: [241, 95, 1, 0, 0, 0, 0],
      payload: [241, 95, 1, 0, 0, 0, 0, 223],
      startTransfer: true,
      endTransfer: true,
      tailByte: 223,
      toggleBit: 0,
      transferID: 31
    });
  });
});

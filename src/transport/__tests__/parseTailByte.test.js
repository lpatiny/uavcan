'use strict';

const parseTailByte = require('../parseTailByte');

describe('parseFrparseTailByteame', () => {
  it('0xdf', () => {
    let result = parseTailByte(0xdf);

    expect(result).toStrictEqual({
      startTransfer: true,
      endTransfer: true,
      toggleBit: 0,
      transferID: 31
    });
  });
});

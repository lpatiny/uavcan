'use strict';

const getFrames = require('../getFrames');

describe('getFrames', () => {
  it('1801550c f15f0100000000df', () => {
    let expected = [
      {
        startTransfer: true,
        endTransfer: true,
        toggleBit: 0,
        transferID: 11,
        dataLength: 7,
        data: [241, 95, 1, 0, 0, 0, 0],
        tailByte: 203,
        payload: [241, 95, 1, 0, 0, 0, 0, 203],
        header: 402653452
      }
    ];

    let sourceNode = {
      transferID: 10,
      toggleBit: false,
      nodeID: 12
    };

    let result = getFrames(
      [0xf1, 0x5f, 0x01, 0x00, 0x00, 0x00, 0x00],
      sourceNode,
      { destinationNodeID: 12 }
    );

    expect(result).toStrictEqual(expected);
  });
});

'use strict';

const getFrames = require('../getFrames');
const Data = require('../../data/Data');

describe('getFrames', () => {
  it('1801550c f15f0100000000df', () => {
    let expected = [
      {
        startTransfer: true,
        endTransfer: true,
        toggleBit: 0,
        isRequest: false,
        isService: false,
        transferID: 11,
        bytes: [241, 95, 1, 0, 0, 0, 0],
        tailByte: 203,
        payload: [241, 95, 1, 0, 0, 0, 0, 203],
        frameID: 402653452
      }
    ];

    let sourceNode = {
      transferID: 10,
      data: {
        11: {
          toggleBit: 0
        }
      },
      nodeID: 12
    };

    let data = new Data([0xf1, 0x5f, 0x01, 0x00, 0x00, 0x00, 0x00], 1);

    let result = getFrames(data, sourceNode, { destinationNodeID: 12 });
    expect(result).toStrictEqual(expected);
  });
});

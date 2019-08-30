'use strict';

const getFrames = require('../getFrames');
const Data = require('../../data/Data');

describe('getFrames', () => {
  it('a message', () => {
    let expected = [
      {
        startTransfer: true,
        endTransfer: true,
        toggleBit: 0,
        dataTypeID: 1,
        destinationNodeID: undefined,
        sourceNodeID: 12,
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

    let result = getFrames(data, sourceNode);
    expect(result[0].epoch).not.toBeNaN();
    expect(result[0].id).not.toBeNaN();
    delete result[0].epoch;
    delete result[0].id;

    expect(result).toStrictEqual(expected);
  });

  it('multi frames', () => {
    let expected = [
      {
        sourceNodeID: 127,
        destinationNodeID: 12,
        dataTypeID: 11,
        startTransfer: true,
        endTransfer: false,
        toggleBit: 0,
        transferID: 11,
        isRequest: true,
        isService: true,
        bytes: [25, 194, 5, 1, 210, 4, 0],
        tailByte: 139,
        payload: [25, 194, 5, 1, 210, 4, 0, 139],
        frameID: 403410175
      },
      {
        sourceNodeID: 127,
        destinationNodeID: 12,
        dataTypeID: 11,
        startTransfer: false,
        endTransfer: true,
        toggleBit: 1,
        transferID: 11,
        isRequest: true,
        isService: true,
        bytes: [0, 0, 0, 0, 0],
        tailByte: 107,
        payload: [0, 0, 0, 0, 0, 107],
        frameID: 403410175
      }
    ];

    let sourceNode = {
      transferID: 10,
      data: {
        11: {
          toggleBit: 0
        }
      },
      nodeID: 127
    };

    let data = new Data(
      [25, 194, 5, 1, 210, 4, 0, 0, 0, 0, 0, 0],
      'uavcan.protocol.param.GetSet',
      { isRequest: true, isService: true }
    );

    let result = getFrames(data, sourceNode, { destinationNodeID: 12 });

    expect(result[0].epoch).not.toBeNaN();
    expect(result[0].id).not.toBeNaN();
    delete result[0].epoch;
    delete result[0].id;
    expect(result[1].epoch).not.toBeNaN();
    expect(result[1].id).not.toBeNaN();
    delete result[1].epoch;
    delete result[1].id;

    expect(result).toStrictEqual(expected);
  });
});

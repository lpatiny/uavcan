'use strict';

const parse = require('../parse');
const dataTypes = require('../../dataTypes.json');

describe('parse GetNodeInfo', () => {
  it('GetNodeInfo request', () => {
    let kindNodeStatus = dataTypes['uavcan.protocol.GetNodeInfo'];
    let data = [];
    let result = parse(data, kindNodeStatus, true, true);
    expect(result).toStrictEqual({});
  });

  it('GetNodeInfo response', () => {
    let kindNodeStatus = dataTypes['uavcan.protocol.GetNodeInfo'];
    let data = [
      0xc2,
      0x51,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
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
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
      0x02,
      0x03,
      0x04,
      0x05,
      0x06,
      0x07,
      0x08,
      0x09,
      0x0a,
      0x0b,
      0x0c,
      0x0d,
      0x0e,
      0x0f,
      0x00,
      0x63,
      0x68,
      0x2e,
      0x6f,
      0x63,
      0x74,
      0x61,
      0x6e,
      0x69,
      0x73,
      0x2e,
      0x6f,
      0x69,
      0x62,
      0x75,
      0x73,
      0x2e,
      0x6d,
      0x69,
      0x6e,
      0x69,
      0x2e,
      0x61,
      0x64,
      0x63,
      0x2d,
      0x64,
      0x61,
      0x63,
      0x2d,
      0x6d,
      0x6f,
      0x64,
      0x75,
      0x6c,
      0x65,
      0x32
    ];

    let result = parse(data, kindNodeStatus, true, false);

    let expected = {
      status: {
        uptimeSec: 86466,
        health: 0,
        mode: 0,
        subMode: 0,
        vendorSpecificStatusCode: 0
      },
      softwareVersion: {
        major: 1,
        minor: 0,
        optionalFieldFlags: 1,
        vcsCommit: 0,
        imageCrc: 0
      },
      hardwareVersion: {
        major: 0,
        minor: 0,
        uniqueId: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        uniqueIdStr:
          '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f',
        certificateOfAuthenticity: []
      },
      name: [
        99,
        104,
        46,
        111,
        99,
        116,
        97,
        110,
        105,
        115,
        46,
        111,
        105,
        98,
        117,
        115,
        46,
        109,
        105,
        110,
        105,
        46,
        97,
        100,
        99,
        45,
        100,
        97,
        99,
        45,
        109,
        111,
        100,
        117,
        108,
        101,
        50
      ],
      nameStr: 'ch.octanis.oibus.mini.adc-dac-module2'
    };

    expect(result).toStrictEqual(expected);
  });
});

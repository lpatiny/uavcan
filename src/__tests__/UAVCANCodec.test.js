'use strict';

const UAVCANCodec = require('../UAVCANCodec');


describe('UAVCANCodec', () => {
  it('id', () => {
    let id = Buffer.from([0x18, 0x3f, 0xf2, 0x6f]);
    let result = (new UAVCANCodec()).parseCanId(id);
    expect(result).toMatchSnapshot();
  });

  it('tail', () => {
    let canPayload = Buffer.from([0, 0, 0xc3]);
    let result = (new UAVCANCodec()).parseTail(canPayload);
    expect(result).toMatchSnapshot();
  });


  it('single_message', () => {
    let canId = [0x18, 0x3f, 0xf2, 0x6f]; // sent by socketcan: 6f550118
    let id = (new UAVCANCodec()).parseCanId(canId);

    let canPayload = [0, 0, 0x7c, 0x42, 0x64, 0x65, 0x66, 0xd2];
    let assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayload), id);
    // console.log(assembled);
    expect(assembled).toStrictEqual('18 111 114');
  });

  it('single_request', () => {
    let canId = [0x1e, 0x0b, 0xef, 0xff];
    let id = (new UAVCANCodec()).parseCanId(canId);

    let canPayload = [0, 0, 0xc3];
    let assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayload), id);
    // console.log(assembled);
    expect(assembled).toStrictEqual('3 127 111');
  });

  // 00 01 1d 00 00 00 00 00 00 00 64 72

  it('bad_data', () => {
    let result;
    let canId = [0x1e, 0x0b, 0x7f, 0xff];
    let canPayload = [[0x00, 0x01, 0x1d, 0x00, 0x00, 0x00, 0x00, 0x00], [0x00, 0x00, 0x64, 0x72]];
    let id = (new UAVCANCodec()).parseCanId(canId);
    try {
      let assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayload), id);
    } catch (error) {
      result = error.message;
    }

    expect(result).toStrictEqual('Bad data');
  });

  it('multi_response', () => {
    let canId = [0x1e, 0x0b, 0x7f, 0xff];
    let id = (new UAVCANCodec()).parseCanId(canId);

    let canPayloadFull = [
      [0xE9, 0xE2, 0x01, 0xFF, 0x03, 0x00, 0x00, 0x83],
      [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x23],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x03],
      [0xFF, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x23],
      [0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03],
      [0x00, 0x00, 0x00, 0x64, 0x72, 0x69, 0x76, 0x23],
      [0x65, 0x72, 0x73, 0x43]
    ];
    let myCodec = new UAVCANCodec();
    let assembled = false;
    for (let i = 0; i < canPayloadFull.length; i++) {
      assembled = myCodec.assembleTransfer(Buffer.from(canPayloadFull[i]), id);
    }

    expect(assembled).toStrictEqual('3 127 127');
  });

  it('packet_interleaved', () => {
    expect.assertions(1);
    const myCodecMulti = new UAVCANCodec();

    function testfnMultiPacket() {
      return new Promise(function (resolve, reject) {
        let canId = [0x1e, 0x0b, 0x7f, 0xff];
        let canPayloadFull = [
          [0xE9, 0xE2, 0x01, 0xFF, 0x03, 0x00, 0x00, 0x83],
          [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x23],
          [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x03],
          [0xFF, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x23],
          [0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03],
          [0x00, 0x00, 0x00, 0x64, 0x72, 0x69, 0x76, 0x23],
          [0x65, 0x72, 0x73, 0x43]
        ];

        let canId2 = [0x1e, 0x0b, 0x7f, 0xef];
        let canPayloadFull2 = [
          [0xE9, 0xE2, 0x01, 0xFF, 0x03, 0x00, 0x00, 0x82],
          [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x22],
          [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02],
          [0xFF, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x22],
          [0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02],
          [0x00, 0x00, 0x00, 0x64, 0x72, 0x69, 0x76, 0x22],
          [0x65, 0x72, 0x73, 0x42]
        ];

        myCodecMulti.on('rx', (arg) => {
          // console.log(`packet1 event: ${JSON.stringify(arg)}`);
          resolve(arg);
        });

        for (let i = 0; i < canPayloadFull.length; i++) {
          myCodecMulti.decode(Buffer.from(canId), Buffer.from(canPayloadFull[i]));
          myCodecMulti.decode(Buffer.from(canId2), Buffer.from(canPayloadFull2[i]));
        }
      });
    }

    expect(testfnMultiPacket()).resolves.toMatchSnapshot();
  });
  it('packet_subsequent', () => {
    expect.assertions(1);
    const myCodecMulti = new UAVCANCodec();

    function testfnMultiPacket() {
      return new Promise(function (resolve, reject) {
        let canId = [0x1e, 0x0b, 0x7f, 0xff];
        let canPayloadFull = [
          [0xE9, 0xE2, 0x01, 0xFF, 0x03, 0x00, 0x00, 0x83],
          [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x23],
          [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x03],
          [0xFF, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x23],
          [0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03],
          [0x00, 0x00, 0x00, 0x64, 0x72, 0x69, 0x76, 0x23],
          [0x65, 0x72, 0x73, 0x43]
        ];

        myCodecMulti.on('rx', (arg) => {
          // console.log(`packet1 event: ${JSON.stringify(arg)}`);
          resolve(arg);
        });

        for (let i = 0; i < canPayloadFull.length; i++) {
          myCodecMulti.decode(Buffer.from(canId), Buffer.from(canPayloadFull[i]));
        }

        for (let i = 0; i < canPayloadFull.length; i++) {
          myCodecMulti.decode(Buffer.from(canId), Buffer.from(canPayloadFull[i]));
        }
      });
    }

    expect(testfnMultiPacket()).resolves.toMatchSnapshot();
  });
});

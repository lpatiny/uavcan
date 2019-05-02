'use strict';

const UAVCANCodec = require('../UAVCANCodec');
const UAVCANTransfer = require('../UAVCANTransfer');


describe('UAVCANCodec', () => {
  it('send', () => { // TODO
    let myCodec = new UAVCANCodec();
    let payload = [];
    let crc = [];
    let transferId = 1;
    let toggle = false;
    let myTransfer = new UAVCANTransfer(payload, crc, transferId, toggle);

    myCodec.encode(myTransfer, (arg) => {
      console.log('tx');
      console.log(arg);
    });
    expect(result).toMatchSnapshot();
  });

  it('make_id_service', () => {
    let canId = Buffer.from([0x1e, 0x0b, 0xef, 0xff]);
    let result = (new UAVCANCodec()).makeCanId(30, 11, true, true, 111, 127);

    expect(result).toStrictEqual(canId);
  });


  it('make_id_message', () => {
    let id = Buffer.from([0x18, 0x3f, 0xf2, 0x6f]);
    let result = (new UAVCANCodec()).makeCanId(24, 16370, false, true, 114, 111);

    expect(result).toStrictEqual(id);
  });


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


  it('single_message_keyValue_float', () => {
    expect.assertions(1);
    const myCodecMulti = new UAVCANCodec();

    function testfnMultiPacket() {
      return new Promise(function (resolve, reject) {
        let canId = [0x18, 0x3F, 0xF2, 0x66];
        let canPayloadFull = [[0x0, 0x0, 0x6C, 0x42, 0x64, 0x65, 0x66, 0xC8]];

        myCodecMulti.on('rx', (arg) => {
          // console.log(`single_message_keyValue_float event: ${JSON.stringify(arg.decodedTransfer)}`);
          resolve(arg.decodedTransfer);
        });

        for (let i = 0; i < canPayloadFull.length; i++) {
          myCodecMulti.decode(Buffer.from(canId), Buffer.from(canPayloadFull[i]));
        }
      });
    }

    expect(testfnMultiPacket()).resolves.toStrictEqual({ value: 59.0, key: [100, 101, 102], keyStr: 'def' });
  });


  it('single_message', () => {
    let canId = Buffer.from([0x18, 0x3f, 0xf2, 0x6f]); // sent by socketcan: 6f550118

    let canPayload = Buffer.from([0, 0, 0x7c, 0x42, 0x64, 0x65, 0x66, 0xd2]);
    let assembled = (new UAVCANCodec()).assembleTransfer(canPayload, canId);
    // console.log(assembled);
    expect(assembled).toStrictEqual('18 111 114');
  });

  it('single_request', () => {
    let canId = Buffer.from([0x1e, 0x0b, 0xef, 0xff]);
    let canPayload = Buffer.from([0, 0, 0xc3]);
    let assembled = (new UAVCANCodec()).assembleTransfer(canPayload, canId);
    // console.log(assembled);
    expect(assembled).toStrictEqual('3 127 111');
  });

  // 00 01 1d 00 00 00 00 00 00 00 64 72

  it('bad_data', () => {
    let result;
    let canId = Buffer.from([0x1e, 0x0b, 0x7f, 0xff]);
    let canPayload = Buffer.from([[0x00, 0x01, 0x1d, 0x00, 0x00, 0x00, 0x00, 0x00], [0x00, 0x00, 0x64, 0x72]]);

    try {
      let assembled = (new UAVCANCodec()).assembleTransfer(canPayload, canId);
    } catch (error) {
      result = error.message;
    }

    expect(result).toStrictEqual('Bad data');
  });

  it('multi_response', () => {
    let canId = Buffer.from([0x1e, 0x0b, 0x7f, 0xff]);

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
      assembled = myCodec.assembleTransfer(Buffer.from(canPayloadFull[i]), canId);
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

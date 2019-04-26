'use strict';

const UAVCANCodec = require('../../UAVCANCodec');


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
    let canId = [0x18, 0x3f, 0xf2, 0x6f];
    let canPayload = [0, 0, 0x7c, 0x42, 0x64, 0x65, 0x66, 0xd2];
    let assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayload));
    expect(assembled).toStrictEqual(true);
  });

  it('single_request', () => {
    let canId = [0x1e, 0x0b, 0xef, 0xff];
    let canPayload = [0, 0, 0xc3];
    let assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayload));

    expect(assembled).toStrictEqual(true);
  });

  it('multi_response', () => {
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

    let assembled = false;
    for (let i = 0; i < canPayloadFull.length; i++) {
      assembled = (new UAVCANCodec()).assembleTransfer(Buffer.from(canPayloadFull[i]));
    }

    expect(assembled).toStrictEqual(true);
  });


  it('packet_multi_response', () => {
    expect.assertions(1);

    function testfnMultiPacket() {
      return new Promise(function (resolve, reject) {
        const myCodec = new UAVCANCodec();
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

        myCodec.on('rx', (arg) => {
          // console.log(`packet event: ${JSON.stringify(arg)}`);
          resolve(arg);
        });

        for (let i = 0; i < canPayloadFull.length; i++) {
          myCodec.decode(Buffer.from(canId), Buffer.from(canPayloadFull[i]));
        }
      });
    }
    expect(testfnMultiPacket()).resolves.toMatchSnapshot();
  });
});

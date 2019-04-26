'use strict';

const { bufferToJSON, kinds } = require('..');

describe('uavtest', () => {
  it('NodeStatus', () => {
    /* real data
    raw: [ 141, 46, 0, 0, 0, 0, 0, 219 ]
    { uptimeSec: 11917,
      health: 0,
      mode: 0,
      sub_mode: 0,
      vendorSpecificStatusCode: 0 }
    */

    let kindNodeStatus = kinds[341];
    let data = [141, 46, 0, 0, 0, 0, 0, 219];

    let result = bufferToJSON(data, kindNodeStatus);
    expect(result).toStrictEqual({
      uptimeSec: 11917,
      health: 0,
      mode: 0,
      subMode: 0,
      vendorSpecificStatusCode: 0
    });
  });

  it('requestParam', () => {
    let kindGetSet = kinds[11];

    // this is my hypothesis of how a uniontag value is encoded based on the examples in
    // https://uavcan.org/Specification/3._Data_structure_description_language/

    let data = [
      0b00000001, // 8bits of index
      0b00000001, // next 5bits of index, then 3bits of uniontag value
      123, // since uniontag = 1, this value is an int64
      0,
      0,
      0,
      0,
      0,
      0,
      0, // last byte of int64
      0x64, // =d beginning of string
      0x72, // =r
      0x69, // =i
      0x76, // =v
      0x65, // =e
      0x72, // =r
      0x73, // =s
    ];

    let result = bufferToJSON(data, kindGetSet, true, true);

    expect(result).toStrictEqual({
      index: 1,
      Value0: 1,
      value: BigInt(123),
      name: [100, 114, 105, 118, 101, 114, 115]
    });
  });

  it('responseParam', () => {
    let kindGetSet = kinds[11];

    let data = [
      0b00000001, 0b11111111, 0b00000011, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0xFF, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00,
      0x64, // =d beginning of string
      0x72, // =r
      0x69, // =i
      0x76, // =v
      0x65, // =e
      0x72, // =r
      0x73, // =s
    ];

    let result = bufferToJSON(data, kindGetSet, true, false);
    console.log(result);

    expect(result).toStrictEqual({ void0: 0,
      Value0: (1),
      value: BigInt(1023),
      void1: 0,
      Value1: (1),
      defaultValue: BigInt(0),
      void2: 0,
      NumericValue2: (1),
      maxValue: BigInt(1023),
      void3: 0,
      NumericValue3: (1),
      minValue: BigInt(0),
      name: [100, 114, 105, 118, 101, 114, 115] });
  });

  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});

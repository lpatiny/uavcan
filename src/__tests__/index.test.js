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
      1, // beginning of string
      0,
      2,
      0,
      3,
      0,
      4,
      0
    ];

    let result = bufferToJSON(data, kindGetSet, true, true);

    expect(result).toStrictEqual({
      index: 1,
      Value0: 1,
      value: BigInt(123),
      name: [1, 0, 2, 0, 3, 0, 4, 0]
    });
  });

  it('responseParam', () => {
    // TODO
    let result = 0;
    expect(result).toMatchSnapshot();
  });

  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});

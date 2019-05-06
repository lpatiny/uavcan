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

  it.only('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});

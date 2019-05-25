'use strict';

const serialize = require('../serialize');

describe('serialize NodeStatus', () => {
  it('NodeStatus packet', () => {
    let data = {
      uptimeSec: 11917,
      health: 0,
      mode: 0,
      subMode: 0,
      vendorSpecificStatusCode: 0
    };
    let result = serialize(data, 'uavcan.protocol.NodeStatus');
    expect(result).toStrictEqual([141, 46, 0, 0, 0, 0, 0]);
  });
});

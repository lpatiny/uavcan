'use strict';

const parse = require('../parse');
const kinds = require('../../kinds.json');

describe('uavtest NodeStatus', () => {
  it('NodeStatus packet', () => {
    let kindNodeStatus = kinds[341];
    let data = [141, 46, 0, 0, 0, 0, 0, 219];

    let result = parse(data, kindNodeStatus);
    expect(result).toStrictEqual({
      uptimeSec: 11917,
      health: 0,
      mode: 0,
      subMode: 0,
      vendorSpecificStatusCode: 0
    });
  });
});

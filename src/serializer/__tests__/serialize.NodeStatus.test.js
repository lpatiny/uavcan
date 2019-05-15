'use strict';

const serialize = require('../serialize');
const kinds = require('../../kinds.json');

describe('serialize NodeStatus', () => {
  it('NodeStatus packet', () => {
    let kindNodeStatus = kinds[341];
    let data = {
      uptimeSec: 11917,
      health: 0,
      mode: 0,
      subMode: 0,
      vendorSpecificStatusCode: 0
    };
    let result = serialize(data, kindNodeStatus);
    expect(result).toStrictEqual([141, 46, 0, 0, 0, 0, 0]);
  });
});
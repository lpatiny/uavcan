'use strict';

const Data = require('../Data');

describe('Data', () => {
  it('check CRC ', () => {
    let data = new Data(
      [25, 194, 5, 1, 210, 4, 0, 0, 0, 0, 0, 0],
      'uavcan.protocol.param.GetSet',
      {
        isService: true,
        isRequest: true
      }
    );
    expect(data).toStrictEqual({
      bytes: [5, 1, 210, 4, 0, 0, 0, 0, 0, 0],
      dataTypeID: 11,
      dataTypeFullID: 'uavcan.protocol.param.GetSet',
      isService: true,
      isRequest: true
    });
  });
});
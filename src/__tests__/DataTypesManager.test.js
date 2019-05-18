'use strict';

const DataTypesManager = require('../DataTypesManager');

describe.skip('DataTypesManager', () => {
  it('get service by ID', () => {
    let dataType = DataTypesManager.getServiceByID(1);
    expect(dataType.id).toBe('uavcan.protocol.GetNodeInfo');
  });

  it('get message by ID', () => {
    let dataType = DataTypesManager.getMessageByID(1);
    expect(dataType.id).toBe('uavcan.protocol.dynamic_node_id.Allocation');
  });
});

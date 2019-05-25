'use strict';

const DataTypesManager = require('../DataTypesManager');

describe('DataTypesManager', () => {
  it('get service ', () => {
    let dataType = DataTypesManager.getDataType(1, true);
    expect(dataType.id).toBe('uavcan.protocol.GetNodeInfo');
  });

  it('get message by ID', () => {
    let dataType = DataTypesManager.getDataType(1, false);
    expect(dataType.id).toBe('uavcan.protocol.dynamic_node_id.Allocation');
  });
});

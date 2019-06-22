'use strict';

const TestAdapter = require('../TestAdapter');

const testAdapter = new TestAdapter();

describe('Adapter multiframe', () => {
  it('setValue request frame', () => {
    let callbackUAVCAN = jest.fn();
    testAdapter.on('uavcan', callbackUAVCAN);

    testAdapter.receiveFrame('180b8cff819c20501d2040085');
    testAdapter.receiveFrame('180b8cff6000000000065');

    expect(callbackUAVCAN).toHaveBeenCalledWith({
      event: 'Service request',
      value: {
        dataTypeID: 11,
        dataTypeFullID: 'uavcan.protocol.param.GetSet',
        bytes: [25, 194, 5, 1, 210, 4, 0, 0, 0, 0, 0, 0],
        priority: 24,
        sourceNodeID: 127,
        isService: true,
        transferID: 5,
        value: {
          index: 5,
          value: { integerValue: 1234 },
          name: [],
          nameStr: ''
        },
        destinationNodeID: 12,
        isRequest: true
      }
    });
  });
});

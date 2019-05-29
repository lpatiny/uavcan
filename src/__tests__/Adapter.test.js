'use strict';

const Node = require('../Node');
const Data = require('../data/Data');
const TestAdapter = require('../adapter/TestAdapter');

const testAdapter = new TestAdapter();

describe('Adapter', () => {
  let node = new Node(5, testAdapter);
  it('send frames to node ', () => {
    let data = new Data([1, 2, 3, 4], 1, {
      isService: true,
      isRequest: true
    });

    let callback = jest.fn();
    testAdapter.on('frame', callback);

    node.send(data, { destinationNodeID: 10 });

    expect(callback).toHaveBeenCalledWith({
      event: 'TX',
      value: {
        frame: {
          isService: true,
          isRequest: true,
          bytes: [1, 2, 3, 4],
          endTransfer: true,
          frameID: 402754181,
          payload: [1, 2, 3, 4, 193],
          startTransfer: true,
          tailByte: 193,
          toggleBit: 0,
          transferID: 1
        },
        text: 'T18018a85501020304c1'
      }
    });
  });

  it('receive node info request frame', () => {
    let callbackFrame = jest.fn();
    testAdapter.on('frame', callbackFrame);

    let callbackUAVCAN = jest.fn();
    testAdapter.on('uavcan', callbackUAVCAN);

    testAdapter.receiveFrame('T18018a85501020304c1');
    expect(callbackFrame).toHaveBeenCalledWith({
      event: 'RX',
      value: {
        frame: {
          bytes: [1, 2, 3, 4],
          endTransfer: true,
          frameID: 402754181,
          payload: [1, 2, 3, 4, 193],
          startTransfer: true,
          sourceNodeID: 5,
          tailByte: 193,
          toggleBit: 0,
          transferID: 1,
          priority: 24,
          isRequest: true,
          isService: true,
          dataTypeID: 1,
          destinationNodeID: 10
        },
        text: 'T18018a85501020304c1'
      }
    });

    testAdapter.receiveFrame('T18018a85501020304c1');
    expect(callbackUAVCAN).toHaveBeenCalledWith({
      event: 'Service request',
      value: {
        bytes: [1, 2, 3, 4],
        dataTypeFullID: 'uavcan.protocol.GetNodeInfo',
        dataTypeID: 1,
        destinationNodeID: 10,
        isRequest: true,
        isService: true,
        priority: 24,
        sourceNodeID: 5,
        transferID: 1,
        value: {}
      }
    });
  });
});

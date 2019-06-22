'use strict';

const Node = require('../../Node');
const Data = require('../../data/Data');
const TestAdapter = require('../TestAdapter');

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

    let result = callback.mock.calls[0][0];
    expect(result.value.epoch).not.toBeNaN();
    expect(result.value.id).not.toBeNaN();
    delete result.value.epoch;
    delete result.value.id;

    expect(result).toStrictEqual({
      event: 'TX',
      value: {
        isService: true,
        isRequest: true,
        dataTypeID: 1,
        destinationNodeID: 10,
        sourceNodeID: 5,
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
    });
  });

  it('receive node info request frame', () => {
    let callbackFrame = jest.fn();
    testAdapter.on('frame', callbackFrame);

    let callbackUAVCAN = jest.fn();
    testAdapter.on('uavcan', callbackUAVCAN);

    testAdapter.receiveFrame('18018a85501020304c1');

    let resultFrame = callbackFrame.mock.calls[0][0];
    expect(resultFrame.value.epoch).not.toBeNaN();
    expect(resultFrame.value.id).not.toBeNaN();
    delete resultFrame.value.epoch;
    delete resultFrame.value.id;

    expect(resultFrame).toStrictEqual({
      event: 'RX',
      value: {
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
      text: '18018a85501020304c1'
    });

    let resultUAVCAN = callbackUAVCAN.mock.calls[0][0];
    expect(resultUAVCAN.value.epoch).not.toBeNaN();
    expect(resultUAVCAN.value.id).not.toBeNaN();
    delete resultUAVCAN.value.epoch;
    delete resultUAVCAN.value.id;

    expect(resultUAVCAN).toStrictEqual({
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

  it('receive message frame', () => {
    let callbackFrame = jest.fn();
    testAdapter.on('frame', callbackFrame);

    let callbackUAVCAN = jest.fn();
    testAdapter.on('uavcan', callbackUAVCAN);

    testAdapter.receiveFrame('1801550c8f15f0100000000df');

    let resultFrame = callbackFrame.mock.calls[0][0];
    expect(resultFrame.value.epoch).not.toBeNaN();
    expect(resultFrame.value.id).not.toBeNaN();
    delete resultFrame.value.epoch;
    delete resultFrame.value.id;

    expect(resultFrame).toStrictEqual({
      event: 'RX',
      value: {
        bytes: [241, 95, 1, 0, 0, 0, 0],
        endTransfer: true,
        frameID: 402740492,
        payload: [241, 95, 1, 0, 0, 0, 0, 223],
        startTransfer: true,
        sourceNodeID: 12,
        tailByte: 223,
        toggleBit: 0,
        transferID: 31,
        priority: 24,
        isService: false,
        dataTypeID: 341
      },
      text: '1801550c8f15f0100000000df'
    });

    let resultUAVCAN = callbackUAVCAN.mock.calls[0][0];
    expect(resultUAVCAN.value.epoch).not.toBeNaN();
    expect(resultUAVCAN.value.id).not.toBeNaN();
    delete resultUAVCAN.value.epoch;
    delete resultUAVCAN.value.id;

    expect(resultUAVCAN).toStrictEqual({
      event: 'Message',
      value: {
        bytes: [241, 95, 1, 0, 0, 0, 0],
        dataTypeFullID: 'uavcan.protocol.NodeStatus',
        dataTypeID: 341,
        isService: false,
        priority: 24,
        sourceNodeID: 12,
        transferID: 31,
        value: {
          uptimeSec: 90097,
          health: 0,
          mode: 0,
          subMode: 0,
          vendorSpecificStatusCode: 0
        }
      }
    });
  });
});

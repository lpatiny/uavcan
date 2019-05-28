'use strict';

const Node = require('../Node');
const Data = require('../data/Data');
const TestAdapter = require('../adapter/TestAdapter');

const testAdapter = new TestAdapter();

describe('Node', () => {
  let node = new Node(5, testAdapter);
  it('send to node ', () => {
    let data = new Data([1, 2, 3, 4], 1, {
      isService: true,
      isRequest: true
    });
    let callback = jest.fn();
    testAdapter.on('frame', callback);

    node.send(data, 10);

    expect(callback).toHaveBeenCalledWith({
      event: 'TX',
      value: {
        frame: {
          data: [1, 2, 3, 4],
          dataLength: 4,
          endTransfer: true,
          header: 402751621,
          payload: [1, 2, 3, 4, 193],
          startTransfer: true,
          tailByte: 193,
          toggleBit: 0,
          transferID: 1
        },
        text: 'T18018085501020304c1'
      }
    });
  });
});

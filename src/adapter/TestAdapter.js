'use strict';

const EventEmitter = require('events');

const bytesToHex = require('../util/bytesToHex');
const hexToBytes = require('../util/hexToBytes');
const parseFrame = require('../transport/parseFrame');
const processFrame = require('../transport/processFrame');
const Node = require('../Node');

class TestAdapter extends EventEmitter {
  constructor() {
    super();
    this.nodes = {};
  }

  sendFrame(frame) {
    let text = 'T';
    text += frame.frameID.toString(16).padStart(8, '0');
    text += frame.payload.length;
    text += bytesToHex(frame.payload);

    // if it was a real adapter we should send this somewhere
    this.emit('frame', {
      event: 'TX',
      value: {
        frame,
        text
      }
    });
  }

  receiveFrame(text) {
    let kind = text.substring(0, 1);
    if (kind !== 'T') {
      throw Error('Frame is expected to start with T');
    }
    let frameID = Number(`0x${text.substr(1, 8)}`);
    let payloadLength = Number(text.substr(9, 1));
    let payload = hexToBytes(text.substr(10));
    if (payloadLength !== payload.length) {
      throw Error(`Wrong length for received frame: ${text}`);
    }
    let frame = parseFrame(frameID, payload);
    this.emit('frame', {
      event: 'RX',
      value: {
        frame,
        text
      }
    });
    processFrame(frame, this);
  }

  getNode(nodeID) {
    if (!this.nodes[nodeID]) {
      this.nodes[nodeID] = new Node(nodeID, this);
    }
    return this.nodes[nodeID];
  }

  update(sourceNodeID) {
    this.getNode(sourceNodeID).seen();
  }
}

module.exports = TestAdapter;

'use strict';

const EventEmitter = require('events');

const processFrame = require('../transport/processFrame');
const Node = require('../Node');

const updateNodeInfo = require('./updateNodeInfo');

class DefaultAdapter extends EventEmitter {
  constructor() {
    super();
    this.nodes = {};

    updateNodeInfo(this);
  }

  frameSent(frame, text) {
    this.emit('frame', {
      event: 'TX',
      value: {
        frame,
        text
      }
    });
  }

  frameReceived(frame, text) {
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

module.exports = DefaultAdapter;

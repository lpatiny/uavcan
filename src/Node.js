'use strict';

const debug = require('debug')('slcan.device');

const getFrames = require('./transport/getFrames');

class Node {
  constructor(nodeID, adapter) {
    this.nodeID = nodeID;
    this.adapter = adapter;
    this.transferID = 0;
    // data should contain an array of objects with
    this.data = [];
    for (let i = 0; i < 32; i++) {
      this.data.push({
        bytes: [],
        toggleBit: 0
      });
    }
  }

  /**
   * Send a data object
   * @param {Data} data
   * @param {object} [options={}]
   */
  send(data, options = {}) {
    let frames = getFrames(data, this, options);
    for (let frame of frames) {
      this.adapter.sendFrame(frame);
    }
  }

  seen() {
    this.lastSeen = Date.now();
  }
}

module.exports = Node;

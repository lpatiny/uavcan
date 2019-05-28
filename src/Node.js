'use strict';

const debug = require('debug')('slcan.device');

const getFrames = require('./transport/getFrames');

class Node {
  constructor(nodeID, adapter) {
    this.nodeID = nodeID;
    this.transferID = 0;
    this.toggleBit = false;
    this.adapter = adapter;
    this.data = new Array(32);
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

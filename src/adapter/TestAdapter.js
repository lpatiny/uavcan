'use strict';

const debug = require('debug')('uavcan.adapter.TestAdapter');

const parseFrame = require('../transport/parseFrame');
const bytesToHex = require('../util/bytesToHex');
const hexToBytes = require('../util/hexToBytes');

const DefaultAdapter = require('./DefaultAdapter');

class TestAdapter extends DefaultAdapter {
  constructor() {
    super();
    this.nodes = {};
  }

  sendFrame(frame) {
    let text = 'T';
    text += frame.frameID.toString(16).padStart(8, '0');
    text += frame.payload.length;
    text += bytesToHex(frame.payload);
    this.frameSent(frame, text);
  }

  receiveFrame(text) {
    let frameID = Number(`0x0${text.substr(0, 8)}`);
    let payloadLength = Number(text.substr(8, 1));
    let payload = hexToBytes(text.substr(9));
    if (payloadLength !== payload.length) {
      throw Error(`Wrong length for received frame: ${text}`);
    }
    let frame = parseFrame(frameID, payload);
    this.frameReceived(frame, text);
  }
}

module.exports = TestAdapter;

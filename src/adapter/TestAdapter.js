'use strict';

const EventEmitter = require('events');

const bytesToHex = require('../util/bytesToHex');

class TestAdapter extends EventEmitter {
  sendFrame(frame) {
    let text = 'T';
    text += frame.header.toString(16).padStart(8, '0');
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
}

module.exports = TestAdapter;

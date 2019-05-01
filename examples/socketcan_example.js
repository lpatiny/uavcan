'use strict';

var can = require('socketcan');

const { UAVCANCodec } = require('../');

var myCodec = new UAVCANCodec();
var channel = can.createRawChannel('slcan0', true);

myCodec.on('rx', (arg) => {
  if (
    arg.decodedCanId.messageTypeId === 341 ||
    arg.decodedCanId.serviceTypeId === 11
  ) {
    console.log(arg.decodedTransfer, arg.decodedCanId.sourceNodeId);
  }
});

// Log any message
channel.addListener('onMessage', function (msg) {
  console.log('ddd');
  let b = Buffer.alloc(4);
  b.writeUInt32BE(msg.id);
  myCodec.decode(b, msg.data);
});
channel.start();

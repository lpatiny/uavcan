'use strict';

const debug = require('debug')('slcan.parseUavcanFrame');

const parseFrameID = require('./parseFrameID');
const parseTailByte = require('./parseTailByte');

// https://uavcan.org/Specification/4._CAN_bus_transport_layer/

module.exports = parseFrame;

function parseFrame(frameID, payload) {
  let result = parseFrameID(frameID);
  result.bytes = payload.slice(0, payload.length - 1);
  result.tailByte = payload[payload.length - 1];
  result.payload = payload;
  result.frameID = frameID;
  result = Object.assign(result, parseTailByte(payload[payload.length - 1]));

  debug(
    `${result.messageTypeDescription} src:${result.sourceNodeID} dst:${
      result.destinationNodeID
    } dataType:${result.dataTypeID} first:${result.startTransfer} last:${
      result.endTransfer
    } toggle:${result.toggleBit} nb:${result.transferID}`
  );

  return result;
}

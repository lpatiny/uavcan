'use strict';

const debug = require('debug')('slcan.parseUavcanFrame');

// https://uavcan.org/Specification/4._CAN_bus_transport_layer/

module.exports = parseFrame;

function parseFrame(header, payload) {
  let result = parseHeader(header);
  result.data = payload.slice(0, payload.length - 1);
  result.dataLength = result.data.length;
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

function parseHeader(header) {
  let toReturn = {
    priority: (header >> 24) & 31,
    isService: (header >> 7) & 1,
    sourceNodeID: header & 127
  };
  if (!toReturn.isService) {
    if (toReturn.sourceNodeID) {
      toReturn.dataTypeID = (header >> 8) & 65535;
      toReturn.isService = false;
    } else {
      toReturn.discriminator = (header >> 10) & 16383;
      toReturn.dataTypeID = (header >> 8) & 3;
      toReturn.isService = false;
    }
  } else {
    toReturn.dataTypeID = (header >> 16) & 255;
    toReturn.isService = true;
    toReturn.isRequest = (header >> 15) & 1;
    toReturn.destinationNodeID = (header >> 8) & 127;
  }

  return toReturn;
}

function parseTailByte(tailByte) {
  return {
    startTransfer: tailByte >> 7,
    endTransfer: (tailByte >> 6) & 1,
    toggleBit: (tailByte >> 5) & 1,
    transferID: tailByte & 31
  };
}

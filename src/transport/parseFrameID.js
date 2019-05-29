'use strict';

function parseFrameID(frameID) {
  let toReturn = {
    priority: (frameID >> 24) & 31,
    isService: (frameID >> 7) & 1,
    sourceNodeID: frameID & 127
  };
  if (!toReturn.isService) {
    if (toReturn.sourceNodeID) {
      toReturn.dataTypeID = (frameID >> 8) & 65535;
      toReturn.isService = false;
    } else {
      toReturn.discriminator = (frameID >> 10) & 16383;
      toReturn.dataTypeID = (frameID >> 8) & 3;
      toReturn.isService = false;
    }
  } else {
    toReturn.dataTypeID = (frameID >> 16) & 255;
    toReturn.isService = true;
    toReturn.isRequest = ((frameID >> 15) & 1) === 1;
    toReturn.destinationNodeID = (frameID >> 8) & 127;
  }

  return toReturn;
}
module.exports = parseFrameID;

'use strict';

/**
 *
 * @param {Data} data
 * @param {Node} sourceNode
 * @param {object} options
 * @param {number} [options.priority=24]
 * @param {number} [options.destinationNodeID]
 * @param {number} [options.discriminator=random]
 */

function getFrames(data, sourceNode, options = {}) {
  let bytes = data.toBytesWithCRC();
  // TODO could be improved to have a counter by type of data
  sourceNode.transferID = (sourceNode.transferID + 1) % 32;
  options = Object.assign({}, options);
  options.sourceNodeID = sourceNode ? sourceNode.nodeID : 0;
  options.isService = data.isService;
  options.isRequest = data.isRequest;
  options.dataTypeID = data.dataTypeID;
  let frameID = serializeFrameID(options);
  sourceNode.toggleBit = 0;
  let frames = [];
  for (let i = 0; i < bytes.length || i === 0; i += 7) {
    let frameBytes = [];
    let j = i;
    for (j; j < Math.min(i + 7, bytes.length); j++) {
      frameBytes.push(bytes[j] & 255);
    }

    let tailByte =
      ((i === 0) << 7) |
      ((j === bytes.length) << 6) |
      (sourceNode.data[sourceNode.transferID].toggleBit << 5) |
      sourceNode.transferID;
    let payload = frameBytes.slice(0).concat(tailByte);
    frames.push({
      sourceNodeID: options.sourceNodeID,
      destinationNodeID: options.destinationNodeID,
      dataTypeID: options.dataTypeID,
      startTransfer: i === 0,
      endTransfer: j === bytes.length,
      toggleBit: sourceNode.data[sourceNode.transferID].toggleBit,
      transferID: sourceNode.transferID,
      isRequest: options.isRequest,
      isService: options.isService,
      bytes: frameBytes,
      tailByte,
      payload,
      frameID
    });
    sourceNode.data[sourceNode.transferID].toggleBit =
      !sourceNode.data[sourceNode.transferID].toggleBit & 1;
  }
  return frames;
}

module.exports = getFrames;

function serializeFrameID(options = {}) {
  let {
    priority = 24,
    sourceNodeID,
    destinationNodeID,
    isService = false,
    isRequest = false,
    dataTypeID = 1,
    discriminator = Math.floor(Math.random(1) * 16384)
  } = options;

  let frameID = 0;

  frameID |= (priority & 31) << 24;
  if (isService) {
    frameID |= sourceNodeID & 127;
    frameID |= 1 << 7;
    frameID |= (destinationNodeID & 127) << 8;
    frameID |= (isRequest & 1) << 15;
    frameID |= (dataTypeID & 255) << 16;
  } else {
    if (sourceNodeID) {
      frameID |= sourceNodeID & 127;
      frameID |= (dataTypeID & 65535) << 8;
    } else {
      frameID |= (dataTypeID & 3) << 8;
      frameID |= (discriminator & 16383) << 10;
    }
  }

  return frameID;
}

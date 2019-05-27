'use strict';

/**
 *
 * @param {array} bytes
 * @param {Node} sourceNode
 * @param {object} options
 * @param {number} [options.priority=24]
 * @param {number} [options.destinationNodeID]
 * @param {number} [options.isService=false]
 * @param {number} [options.isRequest=false]
 * @param {number} [options.dataTypeID=1]
 * @param {number} [options.discriminator=random]
 */

function getFrames(bytes, sourceNode, options = {}) {
  // TODO could be improved to have a counter by type of data
  sourceNode.transferID = (sourceNode.transferID + 1) % 32;
  options = Object.assign({}, options);
  options.sourceNodeID = sourceNode ? sourceNode.nodeID : 0;
  let header = serializeHeader(options);
  sourceNode.toggleBit = 0;
  let frames = [];
  for (let i = 0; i < bytes.length || i === 0; i += 7) {
    let data = [];
    let j = i;
    for (j; j < Math.min(i + 7, bytes.length); j++) {
      data.push(bytes[j] & 255);
    }
    let tailByte =
      ((i === 0) << 7) |
      ((j === bytes.length) << 6) |
      (sourceNode.toggleBit << 5) |
      sourceNode.transferID;
    let payload = data.slice(0).concat(tailByte);
    frames.push({
      startTransfer: i === 0,
      endTransfer: j === bytes.length,
      toggleBit: sourceNode.toggleBit,
      transferID: sourceNode.transferID,
      dataLength: data.length,
      data,
      tailByte,
      payload,
      header
    });
    sourceNode.toggleBit = !sourceNode.toggleBit;
  }
  return frames;
}

module.exports = getFrames;

function serializeHeader(options = {}) {
  let {
    priority = 24,
    sourceNodeID,
    destinationNodeID,
    isService = false,
    isRequest = false,
    dataTypeID = 1,
    discriminator = Math.floor(Math.random(1) * 16384)
  } = options;

  let header = 0;

  header |= (priority & 31) << 24;
  if (isService) {
    header |= sourceNodeID & 127;
    header |= 1 << 7;
    header |= (destinationNodeID & 127) << 8;
    header |= (isRequest & 1) << 15;
    header |= (dataTypeID & 255) << 16;
  } else {
    if (sourceNodeID) {
      header |= sourceNodeID & 127;
      header |= (dataTypeID & 65535) << 8;
    } else {
      header |= (dataTypeID & 3) << 8;
      header |= (discriminator & 16383) << 10;
    }
  }

  return header;
}

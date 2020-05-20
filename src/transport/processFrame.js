'use strict';

const debug = require('debug')('uavcan.transport.processFrame');

const Data = require('../data/Data');

function processFrame(frame, adapter) {
  if (frame.sourceNodeID) {
    adapter.update(frame.sourceNodeID);
  }

  if (frame.isService) {
    processService(frame, adapter);
  } else {
    if (frame.destinationNodeID) {
      processMessage(frame, adapter);
    } else {
      processAnonymousMessage(frame, adapter);
    }
  }
}

function processAnonymousMessage(frame, adapter) {
  emitUAVCAN(frame, frame.bytes, adapter);
}

function processMessage(frame, adapter) {
  let sourceNode = adapter.getNode(frame.sourceNodeID);
  let datum = sourceNode.data[frame.transferID];
  datum.toggleBit = frame.toggleBit;
  datum.transferID = frame.transferID;
  if (frame.startTransfer) {
    datum.bytes.length = 0;
  }
  datum.bytes = datum.bytes.concat(frame.bytes);
  if (frame.endTransfer) {
    emitUAVCAN(frame, datum.bytes, adapter);
  }
}

function processService(frame, adapter) {
  let sourceNode = adapter.getNode(frame.sourceNodeID);
  let datum = sourceNode.data[frame.transferID];
  datum.toggleBit = frame.toggleBit;
  datum.transferID = frame.transferID;
  if (frame.startTransfer) {
    datum.bytes.length = 0;
  }
  datum.bytes = datum.bytes.concat(frame.bytes);
  if (frame.endTransfer) {
    emitUAVCAN(frame, datum.bytes, adapter);
  }
}

function emitUAVCAN(frame, bytes, adapter) {
  let data = new Data(bytes, frame.dataTypeID, {
    isService: frame.isService,
    isRequest: frame.isRequest,
    hasCRC: true
  });

  let kind;
  if (frame.isService) {
    if (frame.isRequest) {
      kind = 'Service request';
    } else {
      kind = 'Service response';
    }
  } else {
    if (frame.sourceNodeID) {
      kind = 'Message';
    } else {
      kind = 'Anonymous message';
    }
  }

  let toSend = {
    id: data.id,
    epoch: data.epoch,
    dataTypeID: frame.dataTypeID,
    dataTypeFullID: data.dataTypeFullID,
    bytes,
    priority: frame.priority,
    sourceNodeID: frame.sourceNodeID,
    isService: frame.isService,
    transferID: frame.transferID,
    value: data.toObject()
  };

  if (frame.destinationNodeID !== undefined) {
    toSend.destinationNodeID = frame.destinationNodeID;
  }
  if (frame.isRequest !== undefined) {
    toSend.isRequest = frame.isRequest;
  }
  debug(toSend);

  adapter.process(toSend); // uavcan receives frame
}

module.exports = processFrame;

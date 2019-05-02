'use strict';

class UAVCANTransfer {
  constructor(
    canId = Buffer.from([]),
    payload = Buffer.from([]),
    crc = [],
    transferId = -1,
    toggleState = -1,
  ) {
    this.payload = payload;
    this.canId = canId;
    this.crc = crc;
    this.id = transferId; // transfer id
    this.toggle = toggleState;
    this.decodedTransfer = {};
    this.decodedCanId = {};
  }
}
module.exports = UAVCANTransfer;

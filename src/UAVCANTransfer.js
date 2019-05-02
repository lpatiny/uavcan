'use strict';

class UAVCANTransfer {
  constructor(
    payload = Buffer.from([]),
    crc = [],
    transferId = -1,
    toggle = -1
  ) {
    this.payload = payload;
    this.crc = crc;
    this.id = transferId; // transfer id
    this.toggle = toggle;
    this.decodedTransfer = {};
    this.decodedCanId = {};
  }
}
module.exports = UAVCANTransfer;

'use strict';

let EventEmitter = require('eventemitter3');


class UAVCANCodec extends EventEmitter {
  constructor() {
    super();
    this._version = 0;
    this._transfer = {
      payload: Buffer.from([]),
      crc: [],
      id: -1,
      toggle: -1
    };
  }

  // only distinguishes between service and message frames, ignores anonymous frames!
  // does not accept 11 bit CAN ids
  parseCanId(canId) {
    if (canId.length < 4) throw Error('Invalid CAN id');

    let id = {
      priority: Number(canId[0]),
      messageTypeId: Number(`0x${canId[1].toString(16)}${canId[2].toString(16)}`), // concatenate byte 2 and 1
      serviceNotMessage: Boolean(canId[3] >> 7), // shift away all bits exept the MSB
      sourceNodeId: Number(canId[3] & (2 ** 8 - 1 >> 1)), // mask byte 0 with 7 ones
      destinationNodeId: Number(canId[2] & (2 ** 8 - 1 >> 1)), // mask byte 1 with 7 ones
      requestNotResponse: Boolean(canId[2] >> 7),
      serviceTypeId: Number(canId[1])
    };

    return id;
  }

  parseTail(canPayload) {
    canPayload = BigInt(`0x${canPayload.toString('hex')}`);
    let tail = {
      startOfTransfer: Boolean((canPayload & BigInt(128)) >> BigInt(7)),
      endOfTransfer: Boolean((canPayload & BigInt(64)) >> BigInt(6)),
      toggle: Boolean((canPayload & BigInt(32)) >> BigInt(5)),
      transferId: Number(canPayload & BigInt(2 ** 5 - 1))
    };

    return tail;
  }

  /**
 * Fires an event with the decoded UAVCAN message.
 * @param {*} canId uint8
 * @param {*} extended boolean
 * @param {*} canPayload uint8[8]
 */
  decode(canId, extended = true, canPayload) {
    let tail = this.parseTail(canPayload);

    console.log(this.parseCanId(canId));

    // end of multiframe transfer
    if (!tail.startOfTransfer && tail.endOfTransfer) {
      this.emit('message', 'multi');

      // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {

      // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {

      // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      this.emit('message', 'single');
    }
  }
}
module.exports = UAVCANCodec;

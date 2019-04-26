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

  /* Puts together a transfer from multiple payploads */
  assembleTransfer(canPayload, startOfTransfer, endOfTransfer) {
    let tail = this.parseTail(canPayload);

    // end of multiframe transfer
    if (!tail.startOfTransfer && tail.endOfTransfer) {
      this.emit('message', 'multi');
      return true;
      // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {
      return false;
      // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {
      return false;
      // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      this.emit('message', 'single');
      return true;
    }
  }

  /**
 * Fires an event with the decoded UAVCAN message.
 * @param {*} canId uint8
 * @param {*} extended boolean
 * @param {*} canPayload uint8[8]
 */
  decode(canId, extended = true, canPayload) {
    let id = this.parseCanId(canId);
    let transferAssembled = this.assembleTransfer(canPayload);

    if (transferAssembled) {
      if (id.serviceNotMessage) {
        // service
        console.log('service assembled');

        if (id.requestNotResponse) {
          // request
          console.log('request assembled');
        } else {
          // response
          console.log('response assembled');
        }
      } else {
        // message
        console.log('message assembled');
      }
    }
  }
}
module.exports = UAVCANCodec;

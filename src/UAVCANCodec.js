'use strict';

let EventEmitter = require('eventemitter3');

let kinds = require('./kinds.json');
let bufferToJSON = require('./util/bufferToJSON');


class UAVCANCodec extends EventEmitter {
  constructor() {
    super();
    this._UAVCANVersion = 0;
    this._transfer = {
      payload: Buffer.from([]),
      crc: [],
      id: -1,
      toggle: -1
    };

    this._packet = {
      transfer: {},
      id: {}
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
  assembleTransfer(canPayload) {
    let tail = this.parseTail(canPayload);

    // end of multiframe transfer
    if (!tail.startOfTransfer && tail.endOfTransfer) {
      let transferLength = canPayload.length - 1;
      let tranferPayload = Buffer.from(canPayload.toString('hex', 0, transferLength), 'hex');
      this._transfer.payload = Buffer.concat([this._transfer.payload, tranferPayload]);
      this._packet.rawTransfer = this._transfer.payload;

      return true;
      // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {
      let tranferPayload = Buffer.from(canPayload.toString('hex', 2, 7), 'hex');
      this._transfer.payload = tranferPayload;

      // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {
      let tranferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');
      this._transfer.payload = Buffer.concat([this._transfer.payload, tranferPayload]);

      // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      let tranferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');
      this._transfer.payload = tranferPayload;
      this._packet.rawTransfer = this._transfer.payload;

      return true;
    }

    return false;
  }


  getMessageFromTransfer(canId) {
    return bufferToJSON(this._transfer.payload, kinds[canId.messageTypeId], false, false);
  }

  getRequestFromTransfer(canId) {
    return bufferToJSON(this._transfer.payload, kinds[canId.serviceTypeId], true, true);
  }

  getResponseFromTransfer(canId) {
    return bufferToJSON(this._transfer.payload, kinds[canId.serviceTypeId], true, false);
  }

  /**
 * Fires an event with the decoded UAVCAN message.
 * @param {*} canId uint8
 * @param {*} extended boolean
 * @param {*} canPayload uint8[8]
 */
  decode(canId, canPayload) {
    let id = this.parseCanId(canId);
    this._packet.id = id;
    let transferAssembled = this.assembleTransfer(canPayload);
    let decodedTransfer;

    this._packet.transfer = {};

    if (transferAssembled) {
      if (id.serviceNotMessage) {
        // service
        if (id.requestNotResponse) {
          // request
          decodedTransfer = this.getRequestFromTransfer(id);
        } else {
          // response
          decodedTransfer = this.getResponseFromTransfer(id);
        }
      } else {
        // message
        decodedTransfer = this.getMessageFromTransfer(id);
      }

      this._packet.transfer = decodedTransfer;
      this.emit('rx', this._packet);
    }
  }
}
module.exports = UAVCANCodec;

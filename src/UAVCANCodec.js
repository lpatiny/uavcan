'use strict';

let EventEmitter = require('eventemitter3');

let kinds = require('./kinds.json');
let bufferToJSON = require('./util/bufferToJSON');

class UAVCANTransfer {
  constructor(payload = Buffer.from([]), crc = [], transferId = -1, toggle = -1) {
    this.payload = payload;
    this.crc = crc;
    this.id = transferId; // transfer id
    this.toggle = toggle;
    this.decodedTransfer = {};
    this.decodedCanId = {};
  }
}

class UAVCANCodec extends EventEmitter {
  constructor() {
    super();
    this._UAVCANVersion = 0;

    this._transfers = {}; // keeps track of all current transfer, indexed by transfer id
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
  assembleTransfer(canPayload, canId) {
    let tail = this.parseTail(canPayload);
    let transferId = String(`${tail.transferId} ${canId.sourceNodeId} ${canId.destinationNodeId}`);

    if (tail.startOfTransfer && tail.endOfTransfer) {

    } else {
      console.log('-----------------');
      console.log('tail:');
      console.log(tail);
      console.log('transferId:');
      console.log(transferId);
      console.log('canId:');
      console.log(canId);
      console.log('canPayload:');
      console.log(canPayload);
      console.log('this._transfers[transferId]');
      console.log(this._transfers[transferId]);
    }


    if (tail.transferId === 0) { // fixme
      return -1;
    }

    // end of multiframe transfer
    if (!tail.startOfTransfer && tail.endOfTransfer) {
      let transferLength = canPayload.length - 1;
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, transferLength), 'hex');

      let priorPayload = this._transfers[transferId].payload;

      this._transfers[transferId].payload = Buffer.concat([priorPayload, transferPayload]);
      this._transfers[transferId].toggle = tail.toggle;

      return transferId;

      // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 2, 7), 'hex');
      this._transfers[transferId] = new UAVCANTransfer(transferPayload, [], transferId, tail.toggle);

      // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');
      let priorPayload = this._transfers[transferId].payload;

      this._transfers[transferId].payload = Buffer.concat([priorPayload, transferPayload]);
      this._transfers[transferId].toggle = tail.toggle;

      // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');
      this._transfers[transferId] = new UAVCANTransfer(transferPayload, [], transferId, tail.toggle);

      return transferId;
    }

    return -1;
  }


  getMessageFromTransfer(transferId, canId) {
    return bufferToJSON(this._transfers[transferId].payload, kinds[canId.messageTypeId], false, false);
  }

  getRequestFromTransfer(transferId, canId) {
    return bufferToJSON(this._transfers[transferId].payload, kinds[canId.serviceTypeId], true, true);
  }

  getResponseFromTransfer(transferId, canId) {
    return (bufferToJSON(this._transfers[transferId].payload, kinds[canId.serviceTypeId], true, false));
  }

  /**
 * Fires an event with the decoded UAVCAN message.
 * @param {*} canId uint8
 * @param {*} extended boolean
 * @param {*} canPayload uint8[8]
 */
  decode(canId, canPayload) {
    let id = this.parseCanId(canId);
    let transferAssembledId = this.assembleTransfer(canPayload, id);
    let decodedTransfer;


    if (transferAssembledId >= 0) {
      if (id.serviceNotMessage) {
        // service
        if (id.requestNotResponse) {
          // request
          decodedTransfer = this.getRequestFromTransfer(transferAssembledId, id);
        } else {
          // response
          decodedTransfer = this.getResponseFromTransfer(transferAssembledId, id);
        }
      } else {
        // message
        decodedTransfer = this.getMessageFromTransfer(transferAssembledId, id);
      }

      this._transfers[transferAssembledId].decodedCanId = id;
      this._transfers[transferAssembledId].decodedTransfer = decodedTransfer;

      this.emit('rx', this._transfers[transferAssembledId]);
      // delete this._transfers[transferAssembledId];
    }
  }
}
module.exports = UAVCANCodec;

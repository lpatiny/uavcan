'use strict';

let EventEmitter = require('eventemitter3');

let kinds = require('./kinds.json');
let parse = require('./parser/parse');
let UAVCANTransfer = require('./UAVCANTransfer');

class UAVCANCodec extends EventEmitter {
  constructor() {
    super();
    this._UAVCANVersion = 0;
    this._decodeErrors = 0;

    this._transfers = {}; // keeps track of all current transfer, indexed by transfer id
  }

  // makes a 4 byte buffer according to UAVCAN spec
  makeCanId(
    priority,
    datatypeId,
    serviceNotMessage,
    requestNotResponse,
    destinationNodeId,
    sourceNodeId
  ) {
    let canId = [0x0, 0x0, 0x0, 0x0];

    canId[0] = priority;
    canId[3] = Number(serviceNotMessage) << 7;
    canId[3] |= sourceNodeId & 0b01111111;

    if (serviceNotMessage) {
      canId[1] = datatypeId;

      if (requestNotResponse) {
        canId[2] = Number(requestNotResponse) << 7;
      }
      canId[2] |= destinationNodeId & 0b01111111;
    } else {
      canId[1] = datatypeId >> 8; // MSB
      canId[2] = datatypeId & Number(0x00ff);
    }

    return Buffer.from(canId);
  }

  // only distinguishes between service and message frames, ignores anonymous frames!
  // does not accept 11 bit CAN ids
  parseCanId(canId) {
    if (canId.length < 4) throw Error('Invalid CAN id');

    let id = {
      priority: Number(canId[0]),
      messageTypeId: Number(
        `0x${canId[1].toString(16)}${canId[2].toString(16)}`
      ), // concatenate byte 2 and 1
      serviceNotMessage: Boolean(canId[3] >> 7), // shift away all bits exept the MSB
      sourceNodeId: Number(canId[3] & ((2 ** 8 - 1) >> 1)), // mask byte 0 with 7 ones
      destinationNodeId: Number(canId[2] & ((2 ** 8 - 1) >> 1)), // mask byte 1 with 7 ones
      requestNotResponse: Boolean(canId[2] >> 7),
      serviceTypeId: Number(canId[1])
    };

    if (id.serviceNotMessage) {
      delete id.messageTypeId;
    } else {
      delete id.serviceTypeId;
      delete id.requestNotResponse;
    }

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
   * Puts together a transfer from multiple fragments
   * @param {*} canPayload 8 bytes of raw CAN frame data
   * @param {*} canId 4 bytes of raw CAN ID data
   */
  assembleTransfer(canPayload, canId) {
    let tail = this.parseTail(canPayload); // decodes the content of the last (8th) byte in every fragment
    let decodedCanId = this.parseCanId(canId);

    let transferId = String(
      `${tail.transferId} ${decodedCanId.sourceNodeId} ${
        decodedCanId.destinationNodeId
      }`
    );

    // end of multiframe transfer
    if (!tail.startOfTransfer && tail.endOfTransfer) {
      let transferLength = canPayload.length - 1;
      let transferPayload = Buffer.from(
        canPayload.toString('hex', 0, transferLength),
        'hex'
      );

      if (this._transfers[transferId] === undefined) {
        throw new Error('Bad data');
      }

      let priorPayload = this._transfers[transferId].payload;

      this._transfers[transferId].payload = Buffer.concat([
        priorPayload,
        transferPayload
      ]);
      this._transfers[transferId].toggle = tail.toggle;
      this._transfers[transferId].decodedCanId = decodedCanId;

      return transferId;

      // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(
        canPayload.toString('hex', 2, 7),
        'hex'
      );
      this._transfers[transferId] = new UAVCANTransfer(
        canId,
        transferPayload,
        [],
        transferId,
        tail.toggle
      );

      // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(
        canPayload.toString('hex', 0, 7),
        'hex'
      );

      if (this._transfers[transferId] === undefined) {
        throw new Error('Bad data');
      }

      let priorPayload = this._transfers[transferId].payload;

      this._transfers[transferId].payload = Buffer.concat([
        priorPayload,
        transferPayload
      ]);
      this._transfers[transferId].toggle = tail.toggle;

      // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      let transferPayload = Buffer.from(
        canPayload.toString('hex', 0, 7),
        'hex'
      );
      this._transfers[transferId] = new UAVCANTransfer(
        canId,
        transferPayload,
        [],
        transferId,
        tail.toggle
      );
      this._transfers[transferId].decodedCanId = decodedCanId;

      return transferId;
    }
    return -1;
  }

  /**
   * Fires an event with the decoded UAVCAN message.
   * @param {*} transfer UAVCANTransfer
   * @param {*} txCallback callback function to CAN transmitter (e.g. socketcan)
   */
  encode(transfer, txCallback) {
    // takes a transfer payload and packs it into 8-byte large can frames
    // can frame contains CRC and tail byte that are added by this function
    // for each frame: txCallback(can_frame)
    /* let payloadToFragment = transfer.payload;
    let crcToPack = transfer.crc;
    let transferId = transfer.transferId;
    let canId = this.makeCanId(transfer.priority, datatypeId, serviceNotMessage, requestNotResponse, destinationNodeId, sourceNodeId);
    */
    // fill payload
    /*

   KIND_ID = 341; //id of "message" NodeStatus
    FILLED_KIND_JSON = {
      "uptimeSec": 17616,
      "health": 0,
      "mode": 0,
      "subMode": 0,
      "vendorSpecificStatusCode": 0
    };
    transfer.payload = _LUCS_JSON_TO_BUFFER(KIND_ID, FILLED_KIND_JSON);

    */
    // fill sequencing information, compute crc
    // ...
    // call transmitter and send fragments out
    /*
    while(fragment_queue_full){
      txCallback(transfer.payload);
    }
    */
  }

  /**
   * Fires an event with the decoded UAVCAN message.
   * @param {*} canId uint8
   * @param {*} extended boolean
   * @param {*} canPayload uint8[8]
   */
  decode(canId, canPayload) {
    let transferAssembledId = this.assembleTransfer(canPayload, canId);

    if (transferAssembledId !== -1) {
      try {
        let id = this._transfers[transferAssembledId].decodedCanId;
        let payload = this._transfers[transferAssembledId].payload;
        let kindToDecode;

        // set kind to associate to transfer based on contents of canId
        if (id.serviceNotMessage) {
          kindToDecode = kinds[id.serviceTypeId];
        } else {
          kindToDecode = kinds[id.messageTypeId];
        }

        let decodedTransfer = parse(
          this._transfers[transferAssembledId].payload,
          kindToDecode,
          id.serviceNotMessage,
          id.requestNotResponse
        );

        this._transfers[transferAssembledId].decodedTransfer = decodedTransfer;

        this.emit('rx', this._transfers[transferAssembledId]);
      } catch (error) {
        console.log(this._transfers[transferAssembledId]);
        console.log(error);

        this._decodeErrors++;
      }

      delete this._transfers[transferAssembledId];
    }
  }
}
module.exports = UAVCANCodec;

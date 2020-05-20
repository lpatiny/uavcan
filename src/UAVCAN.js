'use strict';

const Node = require('./Node');
const Data = require('./data/Data');

function Deferred() {
  var self = this;
  this.promise = new Promise(function (resolve, reject) {
    self.reject = reject;
    self.resolve = resolve;
  });

  setTimeout(() => {
    self.reject('timeout');
  }, 1000);
}

class UAVCAN {
  constructor(options = {}) {
    this.nodes = {};
    this.pendingRequests = [];
    this.parseFrame = require('./transport/parseFrame');
    this.processFrame = require('./transport/processFrame');
    this.adapter = '';
    // const { this.nodeID = 127 } = options;
    this.nodeID = 127; // todo let user choose another nodeID if needed
  }


  attachAdapter(adapter) {
    this.adapter = adapter;

    if (!isNaN(this.nodeID)) {
      this.adapterNode = new Node(this.nodeID, this.adapter);
    } // else throw error, TODO clean
  }

  process(message) {
    // process responses
    let {
      isService,
      isRequest,
      transferID,
      sourceNodeID,
      destinationNodeID,
      dataTypeID,
      dataTypeFullID
    } = message;
    // console.log(message);
    if (isService && isRequest === false) {
      // console.log(message);
      let pendingRequest = this.pendingRequests.pop();
      pendingRequest.resolve(message); // this is what gets put into response
    }

    this.rxCallback(message);
  }

  async setParameter(nodeId, index, value) {
    let data = new Data(
      {
        index: index,
        value: {
          integerValue: value
        },
        nameStr: ''
      },
      'uavcan.protocol.param.GetSet',
      { isService: true, isRequest: true }
    );

    await this.sendRequest(data, nodeId, 0);
  }

  async getParameter(nodeId, index) {
    let data = new Data(
      {
        index: index,
        value: {
          empty: true
        },
        nameStr: ''
      },
      'uavcan.protocol.param.GetSet',
      { isService: true, isRequest: true }
    );

    await this.sendRequest(data, nodeId, 0);
  }

  async sendRequest(data, nodeId, priority) {
    await this.adapterNode.send(data, {
      destinationNodeID: nodeId,
      priority: priority
    });
    var pendingRequest = new Deferred();
    this.pendingRequests.push(pendingRequest);
    try {
      await pendingRequest.promise;
    } catch (err) {
      console.log(err.toString());
    }
  }

  attachRx(rxCallback) {
    console.log('attaching rxCallback');
    this.rxCallback = rxCallback;
  }

  detachRx() {
    console.log('detaching rxCallback');
    this.rxCallback = (rx) => {
      console.log(rx.value.dataTypeFullID);
    };
  }

  getNode(nodeID) {
    if (!this.nodes[nodeID]) {
      this.nodes[nodeID] = new Node(nodeID, this.adapter);
    }
    return this.nodes[nodeID];
  }

  update(sourceNodeID) {
    this.getNode(sourceNodeID).seen();
  }
}

module.exports = UAVCAN;

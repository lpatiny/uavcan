'use strict';

const delay = require('delay');
const debug = require('debug')('uavcan.adapter.updateNodeInfo');

const Data = require('../data/Data');

/**
 *
 * @param {*} adapter
 * @param {object} [options={}]
 */

async function updateNodeInfo(adapter, options = {}) {
  const { sleep = 5000 } = options;
  while (true) {
    let keys = Object.keys(adapter.nodes);
    debug(`Update node info for ${keys.length} node(s)`);
    for (let key of keys) {
      if (adapter.adapterNode) {
        let data = new Data({}, 'uavcan.protocol.GetNodeInfo', {
          isService: true,
          isRequest: true
        });
        adapter.adapterNode.send(data, {
          destinationNodeID: adapter.nodes[key].nodeID
        });
      }
    }
    await delay(sleep);
  }
}

module.exports = updateNodeInfo;

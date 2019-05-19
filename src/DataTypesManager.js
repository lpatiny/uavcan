'use strict';

const dataTypes = require('./dataTypes.json');

const services = {};
const messages = {};
for (let key in dataTypes) {
  let dataType = dataTypes[key];
  if (dataType.info && dataType.info.dataTypeID) {
    switch (dataType.type) {
      case 'service':
        services[dataType.info.dataTypeID] = dataType;
        break;
      case 'message':
        messages[dataType.info.dataTypeID] = dataType;
        break;
      default:
    }
  }
}
function getServiceByID(id) {
  return services[id];
}

function getMessageByID(id) {
  return messages[id];
}

function getDataTypeHash(dataTypeLongID) {
  let dataType = dataTypes[dataTypeLongID];
  if (!dataType || !dataType.info || !dataType.info.hash) return [];
  return dataType.info.hash;
}

module.exports = {
  getMessageByID,
  getServiceByID,
  getDataTypeHash
};

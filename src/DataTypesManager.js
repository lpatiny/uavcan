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

function getServiceByID(dataTypeID) {
  return services[dataTypeID];
}

function getMessageByID(dataTypeID) {
  return messages[dataTypeID];
}

function getDataTypeHash(dataTypeLongID) {
  let dataType = dataTypes[dataTypeLongID];
  if (!dataType || !dataType.info || !dataType.info.hash) return [];
  return dataType.info.hash;
}

function getDataType(dataTypeID, isService) {
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  if (isService) {
    let dataType = getServiceByID(dataTypeID);
    if (dataType) return dataType;
  } else {
    let dataType = getMessageByID(dataTypeID);
    if (dataType) return dataType;
  }
  throw new Error(`Unknown dataType: ${dataTypeID} - isService: ${isService}`);
}

module.exports = {
  getMessageByID,
  getServiceByID,
  getDataTypeHash,
  dataTypes
};

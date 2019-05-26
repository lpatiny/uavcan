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
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  return services[dataTypeID];
}

function getMessageByID(dataTypeID) {
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  return messages[dataTypeID];
}

/**
 *
 * @param {Return the hash } dataTypeID
 */
function getDataTypeHash(dataTypeID, isService) {
  let dataType = getDataType(dataTypeID, isService);
  if (!dataType || !dataType.info || !dataType.info.hash) return [];
  return dataType.info.hash;
}

/**
 * Returns information about the datatype based etierh on the
 * full data type or the data type number and the flag isService
 * @param {*} dataTypeID
 * @param {*} isService
 */
function getDataType(dataTypeID, isService) {
  // if it is a full name
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  if (isService === undefined) {
    throw Error(`can not getDataType of :${dataTypeID}`);
  }
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
  getDataTypeHash,
  dataTypes,
  getDataType
};

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

/**
 * Returns the datatype structure as an object for a service based
 * on the ID
 * @param {number|string} [dataTypeID] Either a number of the datatype full ID
 * @returns {object} datatype structure
 */
function getServiceByID(dataTypeID) {
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  return services[dataTypeID];
}

/**
 * Returns the datatype structure as an object for a messaged based
 * on the ID
 * @param {number|string} [dataTypeID] Either a number of the datatype full ID
 * @returns {object} datatype structure
 */
function getMessageByID(dataTypeID) {
  if (dataTypes[dataTypeID]) return dataTypes[dataTypeID];
  return messages[dataTypeID];
}

/**
 * Returns the hash
 * @param {number|string} [dataTypeID] Either a number of the datatype full ID
 * @param {boolean} [isServicde]
 * @returns {array} array of bytes of the datatype hash
 */
function getDataTypeHash(dataTypeID, isService) {
  let dataType = getDataType(dataTypeID, isService);
  if (!dataType || !dataType.info || !dataType.info.hash) return [];
  return dataType.info.hash;
}

/**
 * Returns information about the datatype based etierh on the
 * full data type or the data type number and the flag isService
 * @param {number|string} [dataTypeID] Either a number of the datatype full ID
 * @param {boolean} [isService]
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

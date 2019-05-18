'use strict';

const parse = require('./parse');

const { getServiceByID } = require('../DataTypesManager');

function parseRequest(data, dataTypeID) {
  let dataType = getServiceByID(dataTypeID);
  return parse(data, dataType, true, true);
}

module.exports = parseRequest;

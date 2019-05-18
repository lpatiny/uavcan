'use strict';

const parse = require('./parse');

const { getServiceByID } = require('../DataTypesManager');

function parseResponse(data, dataTypeID) {
  let dataType = getServiceByID(dataTypeID);
  return parse(data, dataType, true, false);
}

module.exports = parseResponse;

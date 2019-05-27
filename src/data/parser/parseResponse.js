'use strict';

const { getServiceByID } = require('../DataTypesManager');

const parse = require('./parse');

function parseResponse(data, dataTypeID) {
  let dataType = getServiceByID(dataTypeID);
  return parse(data, dataType, true, false);
}

module.exports = parseResponse;

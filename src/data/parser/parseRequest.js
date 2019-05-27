'use strict';

const { getServiceByID } = require('../DataTypesManager');

const parse = require('./parse');

function parseRequest(data, dataTypeID) {
  let dataType = getServiceByID(dataTypeID);
  return parse(data, dataType, true, true);
}

module.exports = parseRequest;

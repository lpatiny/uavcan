'use strict';

const parse = require('./parse');

const { getMessageByID } = require('../DataTypesManager');

function parseMessage(data, dataTypeID) {
  let dataType = getMessageByID(dataTypeID);
  return parse(data, dataType, false, false);
}

module.exports = parseMessage;

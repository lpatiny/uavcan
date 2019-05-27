'use strict';

const { getMessageByID } = require('../DataTypesManager');

const parse = require('./parse');

function parseMessage(data, dataTypeID) {
  let dataType = getMessageByID(dataTypeID);
  return parse(data, dataType, false, false);
}

module.exports = parseMessage;

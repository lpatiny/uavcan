'use strict';

/* global BigInt */

const kinds = require('../../kinds.json');

function processObject(bigInt, variable, from) {
  let value = {};

  return {
    value,
    from
  };
}

module.exports = processObject;

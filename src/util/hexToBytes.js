'use strict';

function hexToBytes(text) {
  return text
    .split(/(..)/)
    .filter((value) => value)
    .map((value) => Number(`0x${value}`));
}

module.exports = hexToBytes;

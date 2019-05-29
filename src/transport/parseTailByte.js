'use strict';

function parseTailByte(tailByte) {
  return {
    startTransfer: tailByte >> 7 === 1,
    endTransfer: ((tailByte >> 6) & 1) === 1,
    toggleBit: (tailByte >> 5) & 1,
    transferID: tailByte & 31
  };
}

module.exports = parseTailByte;

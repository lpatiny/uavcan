'use strict';

const parseFrameID = require('../parseFrameID');

describe('parseFrameID', () => {
  it('0x1801550c', () => {
    let result = parseFrameID(Number('0x1801550c'));

    expect(result.epoch).not.toBeNaN();
    expect(result.id).not.toBeNaN();
    delete result.epoch;
    delete result.id;

    expect(result).toStrictEqual({
      priority: 24,
      isService: false,
      sourceNodeID: 12,
      dataTypeID: 341
    });
  });
});

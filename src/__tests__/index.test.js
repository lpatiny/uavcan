'use strict';

const { bufferToJSON, kinds } = require('..');

describe('uavtest', () => {
  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];
    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});

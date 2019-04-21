'use strict';

const { bufferToJSON, kinds } = require('..');

describe('uavtest', () => {
  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });

  it('responseParameter', () => {
    let kindGetSet = kinds[11];
    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let result = bufferToJSON(data, kindGetSet, true, false);
    expect(result).toMatchSnapshot();
  });
});

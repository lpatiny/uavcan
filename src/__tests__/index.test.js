'use strict';

const { bufferToJSON, kinds } = require('..');

describe('uavtest', () => {
  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let service = false;
    let request = false;

    let result = bufferToJSON(data, kindGeo, service, request);
    expect(result).toMatchSnapshot();
  });
});

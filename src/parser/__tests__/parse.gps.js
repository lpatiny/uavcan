'use strict';

const parse = require('../parse');
const kinds = require('../../kinds.json');

describe('uavtest gps', () => {
  it('one packet', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = parse(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});

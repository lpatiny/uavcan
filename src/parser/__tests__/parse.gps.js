'use strict';

const parse = require('../parse');
const CommunicationType = require('../../CommunicationTypes');
const kinds = require('../../DataTypes.json');

describe('uavtest gps', () => {
  it('one packet', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = parse(data, kindGeo, CommunicationType.TYPE_MESSAGE);
    expect(result).toMatchSnapshot();
  });
});

'use strict';

const parse = require('../parse');
const kinds = require('../../kinds.json');

describe('uavtest gps', () => {
  it('one packet', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = parse(data, kindGeo);
    expect(result).toEqual({
      gimbalId: 12,
      heightCm: 0,
      heightReference: 0,
      latitudeDeg1E7: 0,
      longitudeDeg1E7: 15,
      mode: {
        commandMode: 14
      }
    });
  });
});

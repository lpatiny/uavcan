'use strict';

const serialize = require('../serialize');
const kinds = require('../../kinds.json');

describe('serialize gps', () => {
  it('one packet', () => {
    let kindGeo = kinds[1041];
    let data = {
      gimbalId: 12,
      heightCm: 0,
      heightReference: 0,
      latitudeDeg1E7: 0,
      longitudeDeg1E7: 15,
      mode: {
        commandMode: 14
      }
    };
    let result = serialize(data, kindGeo);
    expect(result).toStrictEqual([12, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

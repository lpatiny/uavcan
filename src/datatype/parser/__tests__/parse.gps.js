'use strict';

const parse = require('../parse');
const dataTypes = require('../../dataTypes.json');

describe('uavtest gps', () => {
  it('one packet', () => {
    let kindGeo = dataTypes['uavcan.equipment.camera_gimbal.GEOPOICommand'];
    let data = [12, 14, 15];

    let result = parse(data, kindGeo);
    expect(result).toStrictEqual({
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

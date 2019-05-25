'use strict';

const fs = require('fs');
const { join } = require('path');

const convertOne = require('../convertOne');

describe('convert', () => {
  it('simple', () => {
    const source = join(
      __dirname,
      '../../../public_regulated_data_types/uavcan/equipment/ahrs/1002.MagneticFieldStrength2.uavcan'
    );

    let content = fs.readFileSync(source, 'utf8');

    let result = convertOne(
      content,
      {},
      {
        name: '1002.MagneticFieldStrength2.uavcan',
        id: 'uavcan.equipment.ahrs.MagneticFieldStrength2'
      }
    );

    // console.log(JSON.stringify(result, undefined, 2));

    expect(result).toMatchSnapshot();
  });
});

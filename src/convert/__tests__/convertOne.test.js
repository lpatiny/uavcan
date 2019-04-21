'use strict';

const fs = require('fs');
const { join } = require('path');

const convertOne = require('../convertOne');

describe('convert', () => {
  it('simple', () => {
    const source = join(
      __dirname,
      '../../../dsdl/equipment/ahrs/1002.MagneticFieldStrength2.uavcan'
    );

    let content = fs.readFileSync(source, 'utf8');

    let result = convertOne(content, 'MagneticFieldStrength2');

    // console.log(JSON.stringify(result, undefined, 2));

    expect(result).toMatchSnapshot();
  });

  it('requestresponse', () => {
    const source = join(
      __dirname,
      '../../../dsdl/protocol/param/11.GetSet.uavcan'
    );

    let content = fs.readFileSync(source, 'utf8');

    let result = convertOne(content, 'GetSet');

    console.log(JSON.stringify(result, undefined, 2));

    expect(result).toMatchSnapshot();
  });
});

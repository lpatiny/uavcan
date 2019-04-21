'use strict';

test.skip('skip', () => {});

const magneticField = {
  description: `Magnetic field readings, in Gauss, in body frame.
    SI units are avoided because of float16 range limitations.`,
  message: {
    variables: [
      {
        description: '',
        kind: 'int',
        bits: 8,
        unsigned: true,
        name: 'sensorId'
      },
      {
        description: '',
        kind: 'floatArray',
        bits: 16,
        length: 3,
        name: 'magneticFieldGa'
      },
      {
        description: '',
        kind: 'floatArray',
        bits: 16,
        length: 9,
        name: 'magneticFieldCovariance'
      }
    ]
  }
};

module.exports = magneticField;

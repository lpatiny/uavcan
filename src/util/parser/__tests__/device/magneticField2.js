'use strict';

test.skip('skip', () => {});

const mangeticField2 = {
  description:
    'Magnetic field readings, in Gauss, in body frame.\nSI units are avoided because of float16 range limitations.',
  type: 'message',
  message: {
    variables: [
      {
        type: 'var',
        kind: 'int',
        unsigned: true,
        bits: 8,
        name: 'sensorId',
        description: ''
      },
      {
        length: 3,
        type: 'array',
        kind: {
          type: 'var',
          kind: 'float',
          unsigned: false,
          bits: 16
        },
        name: 'magneticFieldGa',
        description: ''
      },
      {
        length: 9,
        range: true,
        type: 'array',
        kind: {
          type: 'var',
          kind: 'float',
          unsigned: false,
          bits: 16
        },
        name: 'magneticFieldCovariance',
        description: ''
      }
    ],
    statics: []
  }
};

module.exports = mangeticField2;

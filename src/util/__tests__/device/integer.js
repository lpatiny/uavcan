'use strict';

test.skip('skip', () => {});

const integer = {
  description: 'Basic',
  message: {
    variables: [
      {
        description: '',
        kind: 'int',
        bits: 4,
        unsigned: true,
        name: 'uint4'
      },
      {
        description: '',
        kind: 'int',
        bits: 4,
        unsigned: false,
        name: 'int4'
      },
      {
        description: '',
        kind: 'int',
        bits: 8,
        unsigned: true,
        name: 'uint8'
      },
      {
        description: '',
        kind: 'int',
        bits: 8,
        unsigned: false,
        name: 'int8'
      },
      {
        description: '',
        kind: 'int',
        bits: 16,
        unsigned: true,
        name: 'uint16'
      },
      { description: '', kind: 'int', bits: 16, unsigned: false, name: 'int16' }
    ]
  }
};

module.exports = integer;

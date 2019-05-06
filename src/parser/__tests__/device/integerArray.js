'use strict';

test.skip('skip', () => {});

const integerArray = {
  description: 'Basic',
  message: {
    variables: [
      {
        description: '',
        type: 'array',
        kind: {
          type: 'var',
          kind: 'int',
          bits: 4,
          unsigned: true
        },
        length: 3,
        name: 'arrayUint4'
      },
      {
        description: '',
        type: 'array',
        kind: {
          type: 'var',
          kind: 'int',
          bits: 4,
          unsigned: false
        },
        length: 3,
        name: 'arrayInt4'
      },
      {
        description: '',
        type: 'array',
        kind: {
          type: 'var',
          kind: 'int',
          bits: 8,
          unsigned: true
        },
        length: 10,
        name: 'arrayUint8'
      }
    ]
  }
};

module.exports = integerArray;

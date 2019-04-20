'use strict';

const integerArray = {
  description: 'Basic',
  variables: [
    {
      description: '',
      kind: 'intArray',
      bits: 4,
      length: 3,
      unsigned: true,
      name: 'arrayUint4'
    },
    {
      description: '',
      kind: 'intArray',
      bits: 4,
      length: 3,
      unsigned: false,
      name: 'arrayInt4'
    },
    {
      description: '',
      kind: 'intArray',
      bits: 8,
      length: 10,
      unsigned: true,
      name: 'arrayUint8'
    }
  ]
};

module.exports = integerArray;

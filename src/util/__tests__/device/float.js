'use strict';

test.skip('skip', () => {});

const float = {
  description: 'Float examples',
  variables: [
    {
      description: '',
      kind: 'float',
      bits: 16,
      name: 'float16'
    },
    {
      description: '',
      kind: 'float',
      bits: 32,
      name: 'float32'
    },
    {
      description: '',
      kind: 'float',
      bits: 64,
      unsigned: true,
      name: 'float64'
    }
  ]
};

module.exports = float;

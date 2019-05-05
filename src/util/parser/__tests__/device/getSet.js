'use strict';

test.skip('skip', () => {});

const getSet = {
  description:
    'Get or set a parameter by name or by index.\nNote that access by index should only be used to retrieve the list of parameters; it is highly\ndiscouraged to use it for anything else, because persistent ordering is not guaranteed.\nIndex of the parameter starting from 0; ignored if name is nonempty.\nUse index only to retrieve the list of parameters.\nParameter ordering must be well defined (e.g. alphabetical, or any other stable ordering),\nin order for the index access to work.\nIf set - parameter will be assigned this value, then the new value will be returned.\nIf not set - current parameter value will be returned.\nRefer to the definition of Value for details.\nName of the parameter; always preferred over index if nonempty.\nActual parameter value.\nFor set requests, it should contain the actual parameter value after the set request was\nexecuted. The objective is to let the client know if the value could not be updated, e.g.\ndue to its range violation, etc.\nEmpty value (and/or empty name) indicates that there is no such parameter.\nEmpty name (and/or empty value) in response indicates that there is no such parameter.',
  type: 'service',
  request: {
    variables: [
      {
        type: 'var',
        kind: 'int',
        unsigned: true,
        bits: 13,
        name: 'index',
        description: ''
      },
      {
        type: 'union',
        kind: 'Value',
        name: 'value',
        description: ''
      },
      {
        length: 92,
        range: true,
        type: 'array',
        kind: {
          type: 'var',
          kind: 'int',
          unsigned: true,
          bits: 8
        },
        name: 'name',
        description: ''
      }
    ],
    statics: []
  },
  response: {
    variables: [
      {
        type: 'var',
        kind: 'void',
        unsigned: false,
        bits: 5,
        description: ''
      },
      {
        type: 'union',
        kind: 'Value',
        name: 'value',
        description: ''
      },
      {
        type: 'var',
        kind: 'void',
        unsigned: false,
        bits: 5,
        description: ''
      },
      {
        type: 'union',
        kind: 'Value',
        name: 'defaultValue',
        description: 'Optional'
      },
      {
        type: 'var',
        kind: 'void',
        unsigned: false,
        bits: 6,
        description: ''
      },
      {
        type: 'union',
        kind: 'NumericValue',
        name: 'maxValue',
        description: 'Optional, not applicable for bool/string'
      },
      {
        type: 'var',
        kind: 'void',
        unsigned: false,
        bits: 6,
        description: ''
      },
      {
        type: 'union',
        kind: 'NumericValue',
        name: 'minValue',
        description: 'Optional, not applicable for bool/string'
      },
      {
        length: 92,
        range: true,
        type: 'array',
        kind: {
          type: 'var',
          kind: 'int',
          unsigned: true,
          bits: 8
        },
        name: 'name',
        description: ''
      }
    ],
    statics: []
  }
};

module.exports = getSet;

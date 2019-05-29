'use strict';

const uavcan = require('../index.js');

describe('uavcan', () => {
  it('get service ', () => {
    expect(Object.keys(uavcan)).toHaveLength(8);
  });
});

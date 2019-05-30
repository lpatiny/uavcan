# uavcan

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

## Description

This library contains many utilities allowing to use the UAVCAN protocol directly in javascript.

An example of implementation is available in the project: https://github.com/octanis-instruments/slcan

Here are the various utilities that are available:
* Data:
  * `Data`: a class that allows to deal with UAVCAN data object. It will convert a javascript object to a byte array and the opposite based on the dataTypeID and  isService / isRequest flags
  * `DataTypesManager`: helper to convert dataTypeID to fullDataTypeID and retrieve information about a specific dataTypeFullID
  * `dataTypes`: a json containing the description of all the data types
* Transport: 
  * `getFrames`: Convert a byte array in frames that can be send with the adapter
  * `parseFrame`: Parse the received frame
  * `Node`: a class that corresponds to a Node on the can bus that will receive and send frames. It belongs to a specific Adapter that connects the CAN bus to the computer
  * `DefaultAdapter`: A basic implementation of an adapter that should be extended in order to implement a connection between the computer and the CAN bus. This adapter implements `EventEmitter` and will generate events for `frame` (RX and TX) as well as `data` when the frames are assemble and a new valid data is received.
* Utilities
  * bytesToHex: converts an array of bytes to an hexadecimal string
  * hexToBytes: converts an hexadecimal string to an array of bytes

## Installation

`$ npm install uavcan`

## [API Documentation](https://cheminfo.github.io/uavcan/)

## Example

```js

```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/uavcan.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/uavcan
[travis-image]: https://img.shields.io/travis/cheminfo/uavcan/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo/uavcan
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/uavcan.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/uavcan
[david-image]: https://img.shields.io/david/cheminfo/uavcan.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo/uavcan
[download-image]: https://img.shields.io/npm/dm/uavcan.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/uavcan

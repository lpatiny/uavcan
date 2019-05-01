# uavcan

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

## Installation

`$ npm install uavcan`

## [API Documentation](https://cheminfo.github.io/uavcan/)

## Example

```js
var can = require("socketcan");
const { UAVCANCodec } = require("uavcan");

var myCodec = new UAVCANCodec();
var channel = can.createRawChannel("slcan0", true);

myCodec.on("rx", arg => {
  if (
    arg.decodedCanId.messageTypeId === 341 ||
    arg.decodedCanId.serviceTypeId === 11
  ) {
    console.log(arg.decodedTransfer, arg.decodedCanId.sourceNodeId);
  }
});

// Log any message
channel.addListener("onMessage", function(msg) {
  let b = Buffer.alloc(4);
  b.writeUInt32BE(msg.id);
  myCodec.decode(b, msg.data);
});
channel.start();

//send a message
var myMessage = new UAVCANTransfer(...);
myCodec.encode(myMessage, channel.send);
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

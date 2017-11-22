# ios-simulator

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/ios-simulator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ios-simulator
[travis-image]: https://img.shields.io/travis/macacajs/ios-simulator.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/ios-simulator
[coveralls-image]: https://img.shields.io/coveralls/macacajs/ios-simulator.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/ios-simulator?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/ios-simulator.svg?style=flat-square
[download-url]: https://npmjs.org/package/ios-simulator

> iOS Simulator Node.js wrapper

## Installment

```bash
$ npm i ios-simulator --save
```

## Usage

Enable Developer Mode:

```bash
$ DevToolsSecurity -enable
```

```bash
$ npm i ios-simulator -g
$ ios-simulator -n 'iPhone 6s'
$ xcrun simctl shutdown `ios-simulator -n 'iPhone 6s'`
$ open -a Simulator --args -CurrentDeviceUDID `ios-simulator -n 'iPhone 6s'`
```

## License

The MIT License (MIT)

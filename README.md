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

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1044425?v=4" width="100px;"/><br/><sub><b>ziczhu</b></sub>](https://github.com/ziczhu)<br/>|[<img src="https://avatars1.githubusercontent.com/u/13992714?v=4" width="100px;"/><br/><sub><b>twink1e</b></sub>](https://github.com/twink1e)<br/>|[<img src="https://avatars3.githubusercontent.com/u/1209810?v=4" width="100px;"/><br/><sub><b>paradite</b></sub>](https://github.com/paradite)<br/>|[<img src="https://avatars0.githubusercontent.com/u/4576123?v=4" width="100px;"/><br/><sub><b>CodeToSurvive1</b></sub>](https://github.com/CodeToSurvive1)<br/>|[<img src="https://avatars0.githubusercontent.com/u/1210832?v=4" width="100px;"/><br/><sub><b>djhr</b></sub>](https://github.com/djhr)<br/>
| :---: | :---: | :---: | :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Sun Apr 19 2020 23:35:24 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

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

/* ================================================================
 * ios-simulator by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Feb 18 2016 21:24:24 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const path = require('path');
const EOL = require('os').EOL;

const _ = require('./helper');
const logger = require('./logger');

function Simulator(options) {
  this.deviceId = options.deviceId || null;
}

Simulator.prototype.setDeviceId = function(deviceId) {
  this.deviceId = deviceId;
};

Simulator.prototype.boot = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl boot "${this.deviceId}"`;
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.prototype.isBooted = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = this.deviceId;

  var promise = new Promise((resolve, reject) => {
    Simulator.getDevices().then(data => {
      resolve(_.getDevicesState(data, device) === 'Booted');;
    }).catch(err => {
      reject(`exec ${cmd} error with: ${err}`);
    });
  });

  if (args.length) {
    var cb = args[0];

    return promise.then(data => {
      cb.call(this, null, data);
    }).catch(err => {
      cb.call(this, `exec ${cmd} error with: ${err}`);
    });
  } else {
    return promise;
  }
};

Simulator.prototype.open = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `open -a Simulator --args -CurrentDeviceUDID "${this.deviceId}"`;
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.prototype.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl shutdown "${this.deviceId}"`;
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.prototype.install = function() {
  var args = Array.prototype.slice.call(arguments);
  var appPath = args[0];
  var cmd = `xcrun simctl install "${this.deviceId}" "${appPath}"`;
  return _.execPromiseGenerator(cmd, args[1]);
};

Simulator.prototype.uninstall = function() {
  var args = Array.prototype.slice.call(arguments);
  var pkg = args[0];
  var cmd = `xcrun simctl uninstall "${this.deviceId}" "${pkg}"`;
  return _.execPromiseGenerator(cmd, args[1]);
};

Simulator.prototype.launch = function() {
  var args = Array.prototype.slice.call(arguments);
  var appIdentifier = args[0];
  var cmd = `xcrun simctl launch "${this.deviceId}" "${appIdentifier}"`;
  return _.execPromiseGenerator(cmd, args[1]);
};

Simulator.prototype.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  var appPath = args[0];
  var cmd = `xcrun simctl spawn "${this.deviceId}" "${appPath}"`;
  return _.execPromiseGenerator(cmd, args[1]);
};

Simulator.prototype.erase = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl erase "${this.deviceId}"`;
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.prototype.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl shutdown "${this.deviceId}"`;
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.prototype.getLogDir = function() {
  var args = Array.prototype.slice.call(arguments);
  var home = process.env.HOME;
  var dir = path.resolve(home, 'Library', 'Logs', 'CoreSimulator', this.deviceId);
  return dir
};

Simulator.prototype.getAppDir = function() {
  var args = Array.prototype.slice.call(arguments);
  var home = process.env.HOME;
  var dir = path.resolve(home, 'Library', 'Developer', 'CoreSimulator', 'Devices', this.deviceId, 'data', 'Containers', 'Bundle', 'Application');
  return dir;
};

Simulator.getDevices = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'xcrun simctl list devices';

  var promise = new Promise((resolve, reject) => {
    _.exec(cmd).then(data => {
      resolve(_.parseDevices(data));
    }).catch(err => {
      reject(`exec ${cmd} error with: ${err}`);
    });
  });

  if (args.length) {
    var cb = args[0];

    return promise.then(data => {
      cb.call(this, null, data);
    }).catch(err => {
      cb.call(this, `exec ${cmd} error with: ${err}`);
    });
  } else {
    return promise;
  }
};

Simulator.killAll = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'killAll Simulator';
  return _.execPromiseGenerator(cmd, args[0]);
};

module.exports = Simulator;

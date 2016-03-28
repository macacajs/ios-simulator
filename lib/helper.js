/* ================================================================
 * ios-simulator by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Aug 06 2015 14:48:08 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

let xutil = require('xutil');
let childProcess = require('child_process');

let logger = require('./logger');

var _ = xutil.merge({}, xutil);

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  return new Promise(function(resolve, reject) {
    var stdout = '';
    var stderr = '';
    var child = childProcess.spawn.apply(childProcess, args);

    child.on('error', function(error) {
      reject(error);
    });

    child.stdout.on('data', function(data) {
      stdout += data;
    });

    child.stderr.on('data', function(data) {
      stderr += data;
    });

    child.on('close', function(code) {
      var error;
      if (code) {
        error = new Error(stderr);
        error.code = code;
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
};

_.parseDevices = function(data) {
  var devices = [];
  var runtime = null;

  var parseLine = function(line) {

    if (!!~line.indexOf('--')) {
      var regExp = /--\s(.*)\s--/;
      var matches = regExp.exec(line);
      runtime = matches[1];
      return;
    }

    if (!~line.indexOf('Devices')) {
      var available = false;

      var regExp = /(.*)\(([^)]+)\)\s\(([^)]+)\)\s\(([^)]+)\)/;
      var matches = regExp.exec(line);

      if (!matches) {
        regExp = /(.*)\(([^)]+)\)\s\(([^)]+)\)/;
        matches = regExp.exec(line);
        available = true;
      }

      if (matches) {
        devices.push({
          name: matches[1].trim(),
          udid : matches[2].trim(),
          state : matches[3].trim(),
          available: available,
          runtime: runtime.trim(),
        });
      }
    }
  };

  data.split(/\r?\n/).forEach(function(line) {
    parseLine(line);
  });

  return devices;
};

_.getDevicesState = function(devices, id) {
  var state = null;
  devices.forEach(function(device) {
    if (device.udid === id) {
      state = device.state;
    }
  });
  return state;
};

_.execPromiseGenerator = function(cmd, cb) {
  var promise = _.exec(cmd);

  if (cb) {
    return promise.then(data => {
      cb.call(this, null, data);
    }).catch(err => {
      cb.call(this, `exec ${cmd} error with: ${err}`);
    });
  } else {
    return promise;
  }
};

_.childProcess = childProcess;

module.exports = _;

'use strict';

let fs = require('fs');
let xutil = require('xutil');
let plist = require('plist');
let childProcess = require('child_process');

var _ = xutil.merge({}, xutil);

_.sleep = function(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

_.exec = function(cmd, opts) {
  cmd = cmd.replace('"booted"', 'booted');
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

_.execSync = function(cmd) {
  cmd = cmd.replace('"booted"', 'booted');
  return childProcess.execSync(cmd).toString();
};

_.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  return new Promise(function(resolve, reject) {
    var stdout = '';
    var stderr = '';
    var child = childProcess.spawn.apply(childProcess, args);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

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

_.waitForCondition = function(func, wait/*ms*/, interval/*ms*/) {
  wait = wait || 5000;
  interval = interval || 500;
  let start = Date.now();
  let end = start + wait;
  const fn = function() {
    return new Promise(function(resolve, reject) {
      const continuation = (res, rej) => {
        let now = Date.now();
        if (now < end) {
          res(_.sleep(interval).then(fn));
        } else {
          rej(`Wait For Condition timeout ${wait}`);
        }
      };
      func().then(isOk => {
        if (!!isOk) {
          resolve();
        } else {
          continuation(resolve, reject);
        }
      }).catch(() => {
        continuation(resolve, reject);
      });
    });
  };
  return fn();
};

_.parseDevices = function(data) {
  var devices = [];
  var runtime = null;

  var parseLine = function(line) {

    if (line.match(/--\s(.*)\s--/)) {
      let regExp = /--\s(.*)\s--/;
      let matches = regExp.exec(line);
      runtime = matches[1] || '';
      return;
    }

    if (!~line.indexOf('Devices')) {
      var available = false;

      let regExp = /(.*)\(([^)]+)\)\s\(([^)]+)\)\s\(([^)]+)\)/;
      let matches = regExp.exec(line);

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

_.parsePlist = function(plistFile, cb) {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(plistFile, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(plist.parse(data));
    });
  });

  if (cb) {
    return promise.then(data => {
      cb.call(this, null, data);
    }).catch(err => {
      cb.call(this, `parse plist from ${plistFile} error with: ${err}`);
    });
  } else {
    return promise;
  }
};

_.childProcess = childProcess;

module.exports = _;

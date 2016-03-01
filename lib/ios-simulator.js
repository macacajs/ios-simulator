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

const util = require('util');
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

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.isBooted = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = this.deviceId;

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      Simulator.getDevices().then(data => {
        cb.call(this, null, _.getDevicesState(data, device) === 'Booted');
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return new Promise((resolve, reject) => {
      Simulator.getDevices().then(data => {
        resolve(_.getDevicesState(data, device) === 'Booted');;
      }).catch(err => {
        reject(`exec ${cmd} error with: ${err}`);
      });
    });
  }
};

Simulator.prototype.open = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `open -a Simulator --args -CurrentDeviceUDID "${this.deviceId}"`;

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl shutdown "${this.deviceId}"`;

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.install = function() {
  var args = Array.prototype.slice.call(arguments);
  var appPath = args[0];
  var cmd = `xcrun simctl install "${this.deviceId}" "${appPath}"`;

  if (args.length > 1) {
    var cb = args[1];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.uninstall = function() {
  var args = Array.prototype.slice.call(arguments);
  var pkg = args[0];
  var cmd = `xcrun simctl uninstall "${this.deviceId}" "${pkg}"`;

  if (args.length > 1) {
    var cb = args[1];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.launch = function() {
  var args = Array.prototype.slice.call(arguments);
  var appIdentifier = args[0];
  var cmd = `xcrun simctl launch "${this.deviceId}" "${appIdentifier}"`;

  if (args.length > 1) {
    var cb = args[1];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.erase = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl erase "${this.deviceId}"`;

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

Simulator.prototype.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = `xcrun simctl shutdown "${this.deviceId}"`;

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
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
  var cmd = util.format('xcrun simctl list devices');

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, _.parseDevices(data));
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return new Promise((resolve, reject) => {
      _.exec(cmd).then(data => {
        resolve(_.parseDevices(data));
      }).catch(err => {
        reject(`exec ${cmd} error with: ${err}`);
      });
    });
  }
};

Simulator.killAll = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = util.format('killAll Simulator');

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return _.exec(cmd);
  }
};

module.exports = Simulator;

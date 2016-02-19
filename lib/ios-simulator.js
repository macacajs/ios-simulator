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

let fs = require('fs');
let util = require('util');
let EOL = require('os').EOL;
let _ = require('./helper');
let logger = require('./logger');

let defaultOpt = {

};

function Simulator() {

}

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

Simulator.boot = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('xcrun simctl boot "%s"', device);

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

Simulator.open = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('open -a Simulator --args -CurrentDeviceUDID "%s"', device);

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
    return new Promise((resolve, reject) => {
      _.exec(cmd).then(data => {
        resolve(data);
      }).catch(err => {
        reject(`exec ${cmd} error with: ${err}`);
      });
    });
  }
};

Simulator.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('xcrun simctl shutdown "%s"', device);

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

Simulator.install = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var appPath = args[1];
  var cmd = util.format('xcrun simctl install "%s" "%s"', device, appPath);

  if (args.length > 2) {
    var cb = args[2];

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

Simulator.uninstall = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('xcrun simctl uninstall "%s"', device);

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

Simulator.launch = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var appIdentifier = args[1];
  var cmd = util.format('xcrun simctl launch "%s" "%s"', device, appIdentifier);

  if (args.length > 2) {
    var cb = args[2];

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

Simulator.erase = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('xcrun simctl erase "%s"', device);

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

Simulator.shutdown = function() {
  var args = Array.prototype.slice.call(arguments);
  var device = args[0];
  var cmd = util.format('xcrun simctl shutdown "%s"', device);

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

'use strict';

const path = require('path');
const EOL = require('os').EOL;

const _ = require('./helper');

function Simulator(options) {
  options = options || {};
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
      resolve(_.getDevicesState(data, device) === 'Booted');
    }).catch(err => {
      reject(`exec isBooted error with: ${err}`);
    });
  });

  if (args.length) {
    var cb = args[0];

    return promise.then(data => {
      cb.call(this, null, data);
    }).catch(err => {
      cb.call(this, `exec isBooted error with: ${err}`);
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

Simulator.prototype.installUntilReady = function() {
  var args = Array.prototype.slice.call(arguments);
  var appPath = args[0];
  var bundleId = args[1];
  var cmd = `xcrun simctl install "${this.deviceId}" "${appPath}"`;
  _.execPromiseGenerator(cmd, args[2]).then(() => {});

  var promise = () => {
    return new Promise((resolve, reject) => {
      this.exists(bundleId).then(data => {
        resolve(data);
      }).catch(() => {
        reject('app install failed');
      });
    });
  };
  return _.waitForCondition(promise, 60 * 1000, 1000);
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

Simulator.prototype.remove = function() {
  var cmd = `xcrun simctl delete "${this.deviceId}"`;
  return _.execSync(cmd);
};

Simulator.prototype.openURL = function() {
  var args = Array.prototype.slice.call(arguments);
  var url = args[0];
  var cmd = `xcrun simctl openurl "${this.deviceId}" "${url}"`;
  return _.execPromiseGenerator(cmd, args[1]);
};

Simulator.prototype.spawn = function(args, opt) {
  return _.childProcess.spawn('xcrun', [
    'simctl',
    'spawn',
    this.deviceId
  ].concat(args), opt);
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
  var home = process.env.HOME;
  var dir = path.resolve(home, 'Library', 'Logs', 'CoreSimulator', this.deviceId);
  return dir;
};

Simulator.prototype.getAppDir = function() {
  var home = process.env.HOME;
  var dir = path.resolve(home, 'Library', 'Developer', 'CoreSimulator', 'Devices', this.deviceId, 'data', 'Containers', 'Bundle', 'Application');
  return dir;
};

Simulator.prototype.listInstalledApps = function(type) {
  var home = process.env.HOME;
  var launchPlist = path.resolve(home, 'Library', 'Developer', 'CoreSimulator', 'Devices', this.deviceId, 'data', 'Library', 'MobileInstallation', 'LastLaunchServicesMap.plist');
  return _.parsePlist(launchPlist)
    .then(apps => {
      var systemApps = Object.keys(apps.System);
      var userApps = Object.keys(apps.User);
      if (type === 'system') {
        return systemApps;
      } else if (type === 'user') {
        return userApps;
      } else {
        return systemApps.concat(userApps);
      }
    });
};

Simulator.prototype.exists = function(bundleId) {
  var cmd = `xcrun simctl get_app_container ${this.deviceId} ${bundleId}`;
  return _.exec(cmd).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
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

Simulator.getDevicesSync = () => {
  var cmd = 'xcrun simctl list devices';
  const stdout = _.execSync(cmd);
  return stdout;
};

Simulator.killAll = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'killAll Simulator';
  return _.execPromiseGenerator(cmd, args[0]);
};

Simulator.getAvaliableRuntimes = function() {
  var cmd = 'xcrun simctl list runtimes';
  const stdout = _.execSync(cmd);

  if (!stdout) {
    return;
  }

  const reg = /^(iOS[0-9. -]+)[\s\S]+?(com\.apple\.CoreSimulator\.SimRuntime\.[a-zA-Z0-9.-]+)/i;

  const res = [];

  _.filter(stdout.split(EOL), item => {
    item = item.trim();
    const match = item.match(reg);

    if (match && !/unavailable/i.test(item) && !/iOS\s8\..*/.test(match[1])) {
      res.push({
        name: match[1].trim(),
        value: match[2].trim(),
      });
    }
  });

  return res;
};

Simulator.getDeviceTypes = () => {
  const cmd = 'xcrun simctl list devicetypes';
  return _.execSync(cmd);
};

Simulator.create = (name, deviceTypeId, runTimeId) => {
  const cmd = `xcrun simctl create '${name}' ${deviceTypeId} ${runTimeId}`;
  return _.execSync(cmd).trim();
};

Simulator.launchByUDID = (udid) => {
  const cmd = 'open `xcode-select -p`/Applications/Simulator.app/ --args -CurrentDeviceUDID ' + udid;
  return _.execSync(cmd);
};

const bootedSingleton = new Simulator({
  deviceId: 'booted'
});

module.exports = Simulator;
module.exports.singleton = bootedSingleton;

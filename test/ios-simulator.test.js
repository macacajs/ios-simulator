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

var Simulator = require('..');

describe('lib/ios-simulator.js', function() {
  it('should be', function() {
    Simulator.should.be.ok;
  });

  it('getDevices callback', function(done) {
    Simulator.getDevices(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });
  });

  it('getDevices promise', function(done) {
    Simulator.getDevices().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('boot callback', function *(done) {
    try {
      yield Simulator.killAll();
    } catch(e) {
      console.log(e.stack);
    }
    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        if (device.state === 'Booted') {
          done();
          return;
        }
        Simulator.boot(device.udid, function(err, data) {
          if (err) {
            console.log(err);
            done();
            return;
          }
          console.log(data);
          done();
        });
      }
    });
  });

  it('boot promise', function *(done) {
    try {
      yield Simulator.killAll();
    } catch(e) {
      console.log(e.stack);
    }

    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        if (device.state === 'Booted') {
          done();
          return;
        }
        Simulator.boot(device.udid).then(function(data) {
          console.log(data);
          done();
        }).catch(function(err) {
          console.log(err);
          done();
        });
      }
    });
  });

  it('shutdown callback', function *(done) {
    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        if (device.state !== 'Booted') {
          done();
          return;
        }
        Simulator.shutdown(device.udid, function(err, data) {
          if (err) {
            console.log(err);
            done();
            return;
          }
          console.log(data);
          done();
        });
      }
    });
  });

  it('shutdown promise', function *(done) {
    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        if (device.state !== 'Booted') {
          done();
          return;
        }
        Simulator.shutdown(device.udid).then(function(data) {
          console.log(data);
          done();
        }).catch(function(err) {
          console.log(err);
          done();
        });
      }
    });
  });

  it('open callback', function *(done) {
    try {
      yield Simulator.killAll();
    } catch(e) {
      console.log(e.stack);
    }
    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        Simulator.open(device.udid, function(err, data) {
          if (err) {
            console.log(err);
            done();
            return;
          }
          console.log(data);
          done();
        });
      }
    });
  });

  it('open promise', function *(done) {
    try {
      yield Simulator.killAll();
    } catch(e) {
      console.log(e.stack);
    }
    var devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        Simulator.open(device.udid).then(function(data) {
          done();
        }).catch(function(err) {
          console.log(err);
          done();
        });
      }
    });
  });

  it('erase callback', function *(done) {
    try {
      yield Simulator.killAll();
    } catch(e) {
      console.log(e.stack);
    }
    var devices = yield Simulator.getDevices();
    var _device;
    devices.forEach(function(device) {
      if (device.name === 'iPhone 5s') {
        _device = device.udid;
      }
    });
    try {
      yield Simulator.shutdown(_device);
    } catch(e) {
      console.log(e.stack);
    }
    yield Simulator.erase(_device);
    done();
  });
});

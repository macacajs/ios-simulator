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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.boot(function(err, data) {
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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.boot().then(function(data) {
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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.shutdown(function(err, data) {
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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.shutdown().then(function(data) {
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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.open(function(err, data) {
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
        var sim = new Simulator();
        sim.setDeviceId(device.udid);
        sim.open().then(function(data) {
          done();
        }).catch(function(err) {
          console.log(err);
          done();
        });
      }
    });
  });
});

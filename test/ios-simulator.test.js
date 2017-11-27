'use strict';

var Simulator = require('..');

var sim = null;

var resetEnv = function *() {
  try {
    yield Simulator.killAll();
  } catch (e) {
    console.log(e.stack);
  }
};

var getSim = function *() {
  var devices = yield Simulator.getDevices();
  var matchedDevice = null;

  devices.forEach(function(device) {
    if (device.name === 'iPhone 5s' && device.available) {
      matchedDevice = device;
    }
  });

  if (matchedDevice.state === 'Booted') {
    try {
      sim = new Simulator();
      sim.setDeviceId(matchedDevice.udid);
      yield sim.shutdown();
    } catch (e) {
      console.log(e);
    }
  }

  if (matchedDevice) {
    sim = new Simulator();
    sim.setDeviceId(matchedDevice.udid);
  } else {
    sim = null;
  }
};

describe('lib/ios-simulator.js', function() {

  beforeEach(function *() {
    yield getSim();
  });

  afterEach(function *() {
    yield resetEnv();
  });

  it('should be ok', function() {
    Simulator.should.be.ok;
  });

  it('getDevices callback', function *(done) {
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

    sim.boot(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });
  });

  it('boot promise', function *(done) {

    sim.boot().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });

  });

  it('shutdown callback', function *(done) {

    sim.shutdown(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });

  });

  it('shutdown promise', function *(done) {

    sim.shutdown().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });

  });

  it('open callback', function *(done) {

    sim.open(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });
  });

  it('open promise', function *(done) {

    sim.open().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });
});

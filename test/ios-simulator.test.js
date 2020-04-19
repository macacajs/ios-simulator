'use strict';

var Simulator = require('..');

var sim = null;

async function resetEnv() {
  try {
    await Simulator.killAll();
    console.log('killed all simulators');
  } catch (e) {
    console.log('failed to kill all simulators');
  }
}

async function getSim() {
  var devices = await Simulator.getDevices();
  var matchedDevice = null;

  devices.forEach(function(device) {
    if (device.name === 'iPhone 8' && device.available) {
      matchedDevice = device;
    }
  });

  if (matchedDevice.state === 'Booted') {
    try {
      sim = new Simulator();
      sim.setDeviceId(matchedDevice.udid);
      sim.shutdown();
    } catch (e) {
      console.log('cannot shutdown');
    }
  }

  if (matchedDevice) {
    sim = new Simulator();
    sim.setDeviceId(matchedDevice.udid);
  } else {
    sim = null;
  }
}

describe('lib/ios-simulator.js', function() {
  this.timeout(10 * 60 * 1000);

  before(function () {
    getSim();
  });

  afterEach(function () {
    resetEnv();
  });

  it('should be ok', function() {
    Simulator.should.be.ok;
  });

  it('getDevices callback', function(done) {
    Simulator.getDevices(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(`got ${data.length} devices`);
      done();
    });
  });

  it('getDevices promise', function(done) {
    Simulator.getDevices().then(function(data) {
      console.log(`got ${data.length} devices`);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('boot callback', function(done) {
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

  it('boot promise', function(done) {
    sim.boot().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });

  });

  it('shutdown callback', function(done) {
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

  it('shutdown promise', function(done) {
    sim.shutdown().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('open callback', function(done) {
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

  it('open promise', function(done) {
    sim.open().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });


  it('open success', function(done) {
    sim.open().then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });

  });
});

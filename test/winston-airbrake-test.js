// winston-airbrake-test.js: Tests for instances of the airbrake transport

var vows = require('vows');
var assert = require('assert');
var winston = require('winston');
var helpers = require('winston/test/helpers');
var Airbrake = require('../lib/winston-airbrake').Airbrake;

var transport = new (Airbrake)({host: 'http://localhost', apiKey: 'YOUR_API_KEY'});

function assertAirbrake (transport) {
  assert.instanceOf(transport, Airbrake);
  assert.isFunction(transport.log);
}

vows.describe('winston-airbrake').addBatch({
 "An instance of the Airbrake Transport": {
   "should have the proper methods defined": function () {
     assertAirbrake(transport);
   },
   "the log() method": helpers.testNpmLevels(transport, "should log messages to Airbrake", function (ign, err, logged) {
     if (err) throw err;
     assert.isTrue(!err);
     assert.isTrue(logged);
   })
 }
}).export(module);

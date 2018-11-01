// winston-airbrake.js: Transport for outputting logs to Airbrake
var util = require('util'),
    winston = require('winston'),
    airbrake = require('airbrake');

var Airbrake = exports.Airbrake = winston.transports.Airbrake = function (options) {
  this.name = 'airbrake';
  this.level = options.level || 'info';
  this.silent = options.silent || false;
  this.handleExceptions = options.handleExceptions || false;

  if (options.apiKey) {
    this.airbrakeClient = airbrake.createClient(options.projectId, options.apiKey);
    this.airbrakeClient.serviceHost = options.host;
    this.airbrakeClient.protocol = options.protocol || 'http';
    this.airbrakeClient.handleExceptions = this.handleExceptions;
    this.airbrakeClient.env = options.env || 'production';
  } else {
    throw "You must specify an airbrake API Key to use winston-airbrake";
  }
};

util.inherits(Airbrake, winston.Transport);

Airbrake.prototype.log = function (level, msg, meta, callback) {
  var self = this, err = new Error(msg);

  if (self.silent) {
    return callback(null, true);
  }

  err.type = level;
  if (meta) {
    err.stack = (Array.isArray(meta.stack) ? meta.stack.join('\n') : meta.stack) || "";
    err.url = meta.url || "";
    err.component = meta.component || "";
    err.action = meta.action || "";
    err.params = meta.params || {};
    err.session = meta.session || {};
  }

  self.airbrakeClient.notify(err, function(err, url) {
    if (err) {
      return callback(err, false);
    } else {
      return callback(null, {"url":url});
    }
  });

};

"use strict";

var request = require('request');

var forecast = function forecast(address, callback) {
  var url = 'http://api.weatherstack.com/current?access_key=4a1e2d0fe164b17f03c551662fa59d19&query=' + encodeURIComponent(address) + '&units=m';
  request({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, "It is currently ".concat(body.current.temperature, " degrees out. There's a ").concat(body.current.precip, "% of rain. Weather summary : ").concat(body.current.weather_descriptions));
    }
  });
};

module.exports = forecast;
"use strict";

var express = require('express');

var path = require('path');

var hbs = require('hbs');

var _require = require('express'),
    request = _require.request;

var geocode = require('./utils/geocode.js');

var forecast = require('./utils/forecast.js');

var app = express(); //Setting up path

var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); //Setting up Handle-bars

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); //Setting up static directory to serve

app.use(express["static"](path.join(__dirname, '../public')));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather App',
    name: 'Harshita Hazarika'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About the website',
    name: 'Harshita Hazarika'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    helptext: 'This is a help page',
    title: 'Help',
    name: 'Harshita Hazarika'
  });
});
app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide the address in the URL in the form of address=required address'
    });
  }

  geocode(req.query.address, function (err) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        location = _ref.location;

    if (err) {
      return res.send({
        error: err
      });
    }

    forecast(req.query.address, function (err, forecastData) {
      if (err) {
        return res.send({
          error: err
        });
      }

      res.send({
        Address: location,
        Forecast: forecastData
      });
    });
  });
});
app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404 Page',
    name: 'Harshita Hazarika',
    message: 'Help article not found'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: '404 Page',
    name: 'Harshita Hazarika',
    message: 'Page not found'
  });
}); //app.com
//app.com//help
//app.com/about

app.listen(3000, function () {
  console.log('Server is up on port 3000');
});
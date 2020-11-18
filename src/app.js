const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { request } = require('express');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const app = express();
const port = process.env.PORT || 3000;

//Setting up path
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting up Handle-bars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setting up static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harshita Hazarika'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the website',
        name: 'Harshita Hazarika'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is a help page',
        title: 'Help',
        name: 'Harshita Hazarika'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address in the URL in the form of address=required address'
        });
    }

    geocode(req.query.address, (err, { location } = {}) => {

        if (err) {
            return res.send({
                error: err
            });
        }
        forecast(req.query.address, (err, forecastData) => {
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

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Harshita Hazarika',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Harshita Hazarika',
        message: 'Page not found'
    });
});

//app.com
//app.com//help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port', port);
});
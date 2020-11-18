const request = require('request');
const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4a1e2d0fe164b17f03c551662fa59d19&query=' + encodeURIComponent(address) + '&units=m';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {

            callback(undefined, `It is currently ${body.current.temperature} degrees out. There's a ${body.current.precip}% probability of rain. Weather summary : ${body.current.weather_descriptions}`);
        }
    });
}

module.exports = forecast;
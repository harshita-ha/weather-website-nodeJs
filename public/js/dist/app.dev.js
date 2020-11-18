"use strict";

console.log('Client side js file is loaded!');
var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.getElementById('message-1');
var messageTwo = document.getElementById('message-2');
weatherForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageOne.innerHTML = 'Loading...';
  messageTwo.innerHTML = '';
  fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        messageOne.innerHTML = data.error;
        console.log(data.error);
      } else {
        messageOne.innerHTML = data.Address;
        messageTwo.innerHTML = data.Forecast;
      }
    });
  });
});
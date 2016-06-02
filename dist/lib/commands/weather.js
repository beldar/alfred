'use strict';

var _require = require('../controller');

var controller = _require.controller;

var utils = require('../utils');
var moment = require('moment');

var Geocoder = require('node-geocoder');
var geocoder = Geocoder({
  provider: 'google',
  apiKey: process.env.GM_API_KEY // for Mapquest, OpenCage, Google Premier
});

var Forecast = require('forecast.io-bluebird');
var forecast = new Forecast({
  key: process.env.FORECAST_API_KEY,
  timeout: 2500
});

var icon_to_emoji = {
  'clear-day': '☀️',
  'clear-night': '🌙',
  'rain': '🌧',
  'snow': '❄️',
  'sleet': '🌨',
  'wind': '🌬',
  'fog': '🌫',
  'cloudy': '☁️',
  'partly-cloudy-day': '🌤',
  'partly-cloudy-night': '☁️🌙'
};

module.exports = function (bot, message) {
  var location = message.match[1];

  var formattedLoc = void 0;

  geocoder.geocode(location).then(function (res) {
    if (res.length) {
      var coords = res[0];
      var latitude = coords.latitude;
      var longitude = coords.longitude;


      formattedLoc = coords.formattedAddress;

      return forecast.fetch(latitude, longitude);
    }

    throw new Error('Not found');
  }).then(function (forecast) {
    var reply = 'The weather in *' + formattedLoc + '* looks like ' + icon_to_emoji[forecast.hourly.icon] + ':\n';
    reply += '_' + forecast.hourly.summary + '_ \n';

    forecast.hourly.data.slice(0, 10).forEach(function (hour) {
      var time = moment.unix(hour.time).format('hh:mma');
      reply += '> *' + time + '*: ' + icon_to_emoji[hour.icon] + ' _' + hour.summary + '_ \n';
    });

    bot.reply(message, reply);
  }).catch(function (err) {
    console.error('Weather error: ', err);
    bot.reply(message, 'Looks like I couldn\'t find the weather for that location Sir.');
  });

  //** Uncomment if we want persistence of the last checked location
  //
  //  controller.storage.users.get(message.user, function(err, user) {
  //   if (err) return utils.handleStorageError(err, bot, message);
  //
  //   if (!user) {
  //     user = {
  //       userId: message.user
  //     };
  //   }
  //   user.location = location;
  //   controller.storage.users.save(user, function(err, id) {
  //     if (err) return utils.handleStorageError(err, bot, message);
  //   });
  // });
};
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

var GeoTimezone = require('geo-timezone');
var MomentTimezone = require('moment-timezone');

module.exports = function (bot, message) {
  var location = message.match[1];

  var formattedLoc = void 0;

  geocoder.geocode(location).then(function (res) {
    if (res.length) {
      var coords = res[0];
      var latitude = coords.latitude;
      var longitude = coords.longitude;


      formattedLoc = coords.formattedAddress;

      GeoTimezone.decodeByLngLat({
        coordinates: [longitude, latitude]
      }, function (err, result) {
        if (!err) {
          var time = MomentTimezone().tz(result.timeZoneId).format("h:mm a");
          bot.reply(message, 'The time in *' + formattedLoc + '* is ' + time);
        }
      });

      return;
    }

    throw new Error('Not found');
  }).catch(function (err) {
    console.error('Time error: ', err);
    bot.reply(message, 'Looks like I couldn\'t find the time for that location Sir.');
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
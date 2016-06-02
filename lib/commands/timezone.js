const { controller } = require('../controller');
const utils          = require('../utils');
const moment         = require('moment');

const Geocoder = require('node-geocoder');
const geocoder = Geocoder({
  provider: 'google',
  apiKey: process.env.GM_API_KEY // for Mapquest, OpenCage, Google Premier
});

const GeoTimezone = require('geo-timezone');
const MomentTimezone = require('moment-timezone');

module.exports = (bot, message) => {
  let location = message.match[1].replace(/[^\w\s]/gi, '');

  let formattedLoc;

  geocoder.geocode(location)
  .then(res => {
    if (res.length) {
      let coords = res[0];
      let { latitude, longitude } = coords;

      formattedLoc = coords.formattedAddress;

      GeoTimezone.decodeByLngLat({
        coordinates: [longitude, latitude]
      }, function(err, result) {
        if (!err) {
          let time = MomentTimezone().tz(result.timeZoneId).format("h:mm a")
          bot.reply(message, `The time in *${formattedLoc}* is ${time}`)
        }
      })

      return;
    }

    throw new Error('Not found');
  })
  .catch(err => {
    console.error('Time error: ', err);
    bot.reply(message, `Looks like I couldn't find the time for that location Sir.`);
  })

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

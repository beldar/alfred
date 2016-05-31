const { controller } = require('../controller');
const utils          = require('../utils');
const moment         = require('moment');

const Geocoder = require('node-geocoder');
const geocoder = Geocoder({
  provider: 'google',
  apiKey: process.env.GM_API_KEY // for Mapquest, OpenCage, Google Premier
});

const Forecast = require('forecast.io-bluebird');
const forecast = new Forecast({
  key: process.env.FORECAST_API_KEY,
  timeout: 2500
});

const icon_to_emoji = {
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

module.exports = (bot, message) => {
  let location = message.match[1];

  let formattedLoc;

  geocoder.geocode(location)
  .then(res => {
    if (res.length) {
      let coords = res[0];
      let { latitude, longitude } = coords;

      formattedLoc = coords.formattedAddress;

      return forecast.fetch(latitude, longitude);
    }

    throw new Error('Not found');
  })
  .then((forecast) => {
    let reply = `The weather in *${formattedLoc}* looks like ${icon_to_emoji[forecast.hourly.icon]}:\n`
    reply += `_${forecast.hourly.summary}_ \n`;

    forecast.hourly.data
    .slice(0, 10)
    .forEach(hour => {
      let time = moment.unix(hour.time).format('hh:mma');
      reply += `> *${time}*: ${icon_to_emoji[hour.icon]} _${hour.summary}_ \n`;
    });

    bot.reply(message, reply);
  })
  .catch(err => {
    console.error('Weather error: ', err);
    bot.reply(message, `Looks like I couldn't find the weather for that location Sir.`);
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

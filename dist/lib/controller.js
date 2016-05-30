'use strict';

var Botkit = require('botkit');
var config = require('../config');
var mongoUri = process.env.OPENSHIFT_MONGODB_DB_HOST ? 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/alfred' : config.MONGO;

var storage = require('./botkit-storage-mongo')({ mongoUri: mongoUri });

//console.log('===> Setting storage: ', storage);

var controller = Botkit.slackbot({
  debug: true,
  storage: storage
});

var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

var onExit = function onExit(err) {
  console.log('Shutting down...');

  if (err) console.error(err);

  storage.close();
  controller.storage.users.all(function (err, users) {
    if (!err) {
      users.filter(function (user) {
        return user.private_channel;
      }).forEach(function (user) {
        bot.say({
          text: 'Sorry sir, it seems I\'m shutting down',
          channel: user.private_channel
        });
      });
    } else {
      console.error(err);
    }
  });
};

process.on('exit', onExit);
process.on('SIGINT', function () {
  return process.exit();
});
process.on('uncaughtException', function (err) {
  console.error(err);
  process.exit();
});

module.exports = { controller: controller, bot: bot };
'use strict';

var Botkit = require('botkit');
var config = require('../config');
var mongoUri = process.env.OPENSHIFT_MONGODB_DB_HOST ? 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/alfred' : config.MONGO;

console.log('Connecting to mongo: ', mongoUri);

var storage = require('./botkit-storage-mongo')({ mongoUri: mongoUri });

var controller = Botkit.slackbot({
  debug: false,
  storage: storage
});

var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

//controller.on('message_received', (bot, message) => console.log('Message received: ', message));
controller.on('direct_mention', function (bot, message) {
  return console.log('Direct mention: ', message);
});
controller.on('direct_message', function (bot, message) {
  return console.log('Direct message: ', message);
});

var onExit = function onExit(err) {
  console.log('Shutting down...');

  storage.close();
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
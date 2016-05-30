const Botkit = require('botkit');
const config = require('../config');
const mongoUri = process.env.OPENSHIFT_MONGODB_DB_HOST ?
                 `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}/alfred`
                 : config.MONGO;

console.log('===> Connecting to mongo: ', mongoUri);

const storage = require('./botkit-storage-mongo')({mongoUri: mongoUri});

const controller = Botkit.slackbot({
  debug  : false,
  storage: storage
});

const bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.on('message_received', (bot, message) => console.log('===> Message received: ', message));
controller.on('direct_mention', (bot, message) => console.log('===> Direct mention: ', message));
controller.on('direct_message', (bot, message) => console.log('===> Direct message: ', message));

const onExit = (err) => {
  console.log('Shutting down...');

  storage.close();
};

process.on('exit', onExit);
process.on('SIGINT', () => process.exit());
process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit();
});

module.exports = { controller, bot };

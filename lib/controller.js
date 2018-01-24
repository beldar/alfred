const Botkit   = require('botkit');
const utils    = require('./utils');
const config   = require('../config');
const mongoUri = process.env.MONGO_URI || config.MONGO;

const storage = require('./botkit-storage-mongo')({mongoUri: mongoUri});

const controller = Botkit.slackbot({
  debug  : false,
  storage: storage
});

const bot = controller.spawn({
  token: process.env.SLACK_TOKEN,
  retry: 10
}).startRTM();


//controller.on('message_received', (bot, message) => console.log('Message received: ', message));
controller.on('direct_mention', (bot, message) => console.log('Direct mention: ', message));
controller.on('direct_message', (bot, message) => {
  console.log('Direct message: ', message);

  controller.storage.users.get(message.user, function(err, user) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (user && user.private_channel) return;

    if (!user) {
      user = {
          userId: message.user
      };
    }
    user.private_channel = message.channel;

    controller.storage.users.save(user, function(err, id) {
      if (err) return utils.handleStorageError(err, bot, message);
    });
  });
});


const onExit = (err) => {
  console.log('Shutting down...');

  storage.close();
};
process.on('exit', onExit);
process.on('SIGINT', () => process.exit());
process.on('uncaughtException', (err) => {
  console.error(err.stack ? err.stack : err);
  process.exit();
});

module.exports = { controller, bot };

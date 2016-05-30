const Botkit = require('botkit');
const config = require('../config');
const mongoUri = process.env.OPENSHIFT_MONGODB_DB_HOST ?
                 `mongodb://${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}/alfred`
                 : config.MONGO;

const storage = require('./botkit-storage-mongo')({mongoUri: mongoUri});

//console.log('===> Setting storage: ', storage);

const controller = Botkit.slackbot({
  debug  : true,
  storage: storage
});

const bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

const onExit = (err) => {
  console.log('Shutting down...');

  storage.close();
  // controller.storage.users.all((err, users) => {
  //   if (!err) {
  //     users
  //     .filter(user => user.private_channel)
  //     .forEach((user) => {
  //         bot.say({
  //           text: `Sorry sir, it seems I'm shutting down`,
  //           channel: user.private_channel
  //         });
  //     });
  //   } else {
  //     console.error(err);
  //   }
  // });
};

process.on('exit', onExit);
process.on('SIGINT', () => process.exit());
process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit();
});

module.exports = { controller, bot };

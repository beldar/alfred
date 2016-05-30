const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  controller.storage.users.get(message.user, function(err, user) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (user && user.name) {
        bot.reply(message, 'Hello ' + user.name + ', how may I serve you? Write `help` to see some options.');
    } else {
        bot.reply(message, 'Hello sir, how may I serve you? Write `help` to see some options.');
    }
  });
};

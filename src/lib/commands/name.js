const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  let name = message.match[1];

  controller.storage.users.get(message.user, function(err, user) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (!user) {
      user = {
        userId: message.user
      };
    }
    user.name = name;
    controller.storage.users.save(user, function(err, id) {
      if (err) return utils.handleStorageError(err, bot, message);

      utils.addReaction(bot, message, '+1');
      bot.reply(message, 'Understood. I will call you ' + user.name + ' from now on.');
    });
  });
};

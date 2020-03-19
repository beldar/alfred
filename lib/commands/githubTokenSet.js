const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  let token = utils.cleanString(message.match[1]);

  controller.storage.users.get(message.user, function(err, user) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (!user) {
      user = {
        userId: message.user
      };
    }
    user.githubToken = token;
    controller.storage.users.save(user, function(err, id) {
      if (err) return utils.handleStorageError(err, bot, message);

      utils.addReaction(bot, message, '+1');
      bot.reply(message, 'Understood. I will remember ' + user.githubToken + ' as your GitHub token from now on.');
    });
  });
};

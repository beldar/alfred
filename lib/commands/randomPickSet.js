const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  let picks = message.match[1] && message.match[1].split(',').map(p => p.trim());

  if (picks && picks.length) {
    controller.storage.channels.get(message.channel, function(err, channel) {
      if (err) return utils.handleStorageError(err, bot, message);

      if (!channel) {
        channel = {
          userId: message.channel
        };
      }
      channel.picks = picks;
      controller.storage.channels.save(channel, function(err, id) {
        if (err) return utils.handleStorageError(err, bot, message);

        utils.addReaction(bot, message, '+1');
        bot.reply(message, 'Understood. The new random picks are: ' + picks.join(' , '));
      });
    });
  }
};

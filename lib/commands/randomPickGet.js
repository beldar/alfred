const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  controller.storage.channels.get(message.channel, function(err, channel) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (!channel || !channel.picks) {
      bot.reply(message, `I'm afraid I don't have a record of any picks being set.`)
    } else {
      const pick = utils.getRandom(channel.picks);
      bot.reply(message, `The random pick is *${pick}*`)
    }
  });
};

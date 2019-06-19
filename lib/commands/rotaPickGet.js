const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  controller.storage.channels.get(message.channel, function(err, channel) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (!channel || !channel.rota) {
      bot.reply(message, `I'm afraid I don't have a record of any rota being set.`)
    } else {
      const pick = channel.rota[channel.rotaIndex];
      if (channel.rotaIndex === channel.rota.length-1) {
        channel.rotaIndex = 0
      } else {
        channel.rotaIndex++
      }
      bot.reply(message, `The rota pick is *${pick}*`)
      controller.storage.channels.save(channel, function(err, id) {
        if (err) return utils.handleStorageError(err, bot, message);
      });
    }
  });
};

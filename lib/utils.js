module.exports = {
  addReaction(bot, message, emoji) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: emoji,
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
  }
}

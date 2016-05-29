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
  },

  handleStorageError(bot, message, isConvo) {
    let apology = 'Apologies sir, there seems to be a problem with my storage.';

    if (isConvo) {
      bot.say(apology);
      bot.next();
      return;
    }
    
    this.addReaction(bot, message, '-1');
    bot.reply(message, apology);
  }
}
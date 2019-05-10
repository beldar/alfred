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

  handleStorageError(err, bot, message, isConvo) {
    console.error('Storage error: ', err);

    let apology = 'Apologies sir, there seems to be a problem with my storage.';

    if (isConvo) {
      bot.say(apology);
      bot.next();
      return;
    }

    this.addReaction(bot, message, '-1');
    bot.reply(message, apology);
  },

  cleanString(string) {
    return string.replace(/[^\w\s]/gi, '');
  },

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

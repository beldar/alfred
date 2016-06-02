module.exports = (bot, message) => {
  let reply = `Hello there! I'm Alfred and I'm here to serve you!
You can execute commands by mentioning me or talking to me on a private channel.
Say *@alfred help* for a list of all my commands`;

  bot.reply(message, reply);
};

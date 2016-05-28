const commands = require('./index');

module.exports = (bot, message) => {
  console.log(commands);
  let reply = 'Here are my current commands:\n\n';

  reply += commands
            .map(command => '• ' + command.help)
            .join('\n\n');

  bot.reply(message, reply);
};

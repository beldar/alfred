const commands = require('./index');
const version  = require('../../../package.json').version;

module.exports = (bot, message) => {
  let reply = `I'm Alfred v${version} created by Marti Planellas\n\n Here are my current commands:\n\n`;

  reply += commands
            .map(command => '• ' + command.help)
            .join('\n\n');

  bot.reply(message, reply);
};

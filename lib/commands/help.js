const commands = require('./index');
const version  = require('../../package.json').version;

module.exports = (bot, message) => {
  let reply = `I'm Alfred v${version} your Slack butler\n\n Here are my current commands:\n\n`;

  reply += commands
            .filter(command => command.help)
            .map(command => '• ' + command.help)
            .join('\n\n');

  bot.reply(message, reply);
};

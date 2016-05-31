'use strict';

var commands = require('./index');
var version = require('../../../package.json').version;

module.exports = function (bot, message) {
          var reply = 'I\'m Alfred v' + version + ' created by Marti Planellas\n\n Here are my current commands:\n\n';

          reply += commands.filter(function (command) {
                    return command.help;
          }).map(function (command) {
                    return '• ' + command.help;
          }).join('\n\n');

          bot.reply(message, reply);
};
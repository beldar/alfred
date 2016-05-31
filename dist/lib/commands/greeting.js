"use strict";

module.exports = function (bot, message) {
  var reply = "Hello there! I'm Alfred and I'm here to serve you!\nYou can execute commands by mentioning me or talking to me on a private channel.\nSay *@alfred help* for a list of all my commands";

  bot.reply(message, reply);
};
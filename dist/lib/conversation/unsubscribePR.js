'use strict';

var _require = require('../controller');

var controller = _require.controller;


module.exports = function (bot, message) {
  controller.storage.users.get(message.user, function (err, user) {
    if (err) return utils.handleStorageError(bot, message);

    if (!user) {
      user = {
        id: message.user
      };
    }

    user.listen_prs = false;

    controller.storage.users.save(user, function (err, id) {
      if (err) return utils.handleStorageError(bot, message);

      bot.reply(message, 'Understood sir, I am now unsubscribed from your PR updates');
    });
  });
};
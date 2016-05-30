'use strict';

var _require = require('../controller');

var controller = _require.controller;

var utils = require('../utils');

module.exports = function (bot, message) {
  var name = message.match[1];

  controller.storage.users.get(message.user, function (err, user) {
    if (err) return utils.handleStorageError(bot, message);

    if (!user) {
      user = {
        id: message.user
      };
    }
    user.name = name;
    controller.storage.users.save(user, function (err, id) {
      if (err) return utils.handleStorageError(bot, message);

      utils.addReaction(bot, message, '+1');
      bot.reply(message, 'Understood. I will call you ' + user.name + ' from now on.');
    });
  });
};
'use strict';

var _require = require('../controller');

var controller = _require.controller;

var utils = require('../utils');

module.exports = function (bot, message) {
  controller.storage.users.get(message.user, function (err, user) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (user && user.private_channel) return;

    if (!user) {
      user = {
        userId: message.user
      };
    }
    user.private_channel = message.channel;

    controller.storage.users.save(user, function (err, id) {
      if (err) return utils.handleStorageError(err, bot, message);
    });
  });
};
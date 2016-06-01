'use strict';

var _require = require('../controller');

var controller = _require.controller;

var utils = require('../utils');

var askUsername = function askUsername(response, convo) {
  convo.ask('Could I ask for your Github username sir?', function (response, convo) {
    var gh_username = response.text;
    var private_channel = response.channel;
    var listen_prs = true;

    var userData = {
      gh_username: gh_username,
      private_channel: private_channel,
      listen_prs: listen_prs
    };

    controller.storage.users.get(response.user, function (err, user) {
      if (err) return utils.handleStorageError(err, convo, '', true);

      if (!user) {
        user = {
          userId: response.user
        };
      }

      user = Object.assign(user, userData);

      controller.storage.users.save(user, function (err, id) {
        if (err) return utils.handleStorageError(err, convo, '', true);

        convo.say('Excellent sir, from now on you\'ll receive a message every time there\'s an update with your PRs');
        convo.next();
      });
    });
  });
};

module.exports = function (bot, message) {
  bot.startPrivateConversation(message, askUsername);
};
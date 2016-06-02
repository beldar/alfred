'use strict';

var _require = require('../controller');

var controller = _require.controller;

var utils = require('../utils');

var askUsername = function askUsername(response, convo) {
  convo.say('Hi Sir, this feature will allow you to receive updates on your PRs, those include comments, status changes and labels.\
\nThere is one step you need to do to make this work, you need to go to your repository and on `Settings > Webhooks & services` add a new webhook.\
\nYou need to use this URL: `https://alfred-slackbot1.rhcloud.com/webhooks` and select these individual events: `Commit comment, Issue comment, Pull request, Pull request review comment`\
\nTo notify you I also need to know your Github username.');
  convo.ask('Could I ask for your Github username sir?', function (response, convo) {
    var gh_username = response.text;
    var private_channel = response.channel;
    var listen_prs = true;

    if (gh_username.trim() === 'no') {
      convo.say('Understood Sir, we\'ll leave it for another time');
      convo.next();
      return;
    }

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

        convo.say('Excellent Sir, from now on you\'ll receive a message every time there\'s an update with your PRs');
        convo.next();
      });
    });
  });
};

module.exports = function (bot, message) {
  bot.startPrivateConversation(message, askUsername);
};
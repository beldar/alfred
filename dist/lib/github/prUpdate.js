'use strict';

var _require = require('../controller');

var controller = _require.controller;
var bot = _require.bot;


var formatMessage = function formatMessage(data) {
  var action = data.action;
  var link = data.pull_request.html_url;
  var pr = data.pull_request.title;
  var extra = '';

  switch (action) {
    case 'labeled':
      extra = '*_' + data.label.name + '_*';
      break;
    case 'assigned':
    case 'unassigned':
      extra = 'to *' + data.assignee.login + '*';
      break;
    case 'closed':
      if (data.pull_request.merged) {
        return 'Your PR: *' + pr + '* has been *merged*!! 🎉🎉🎉\n\n' + link;
      }

      return 'Your PR: *' + pr + '* has been *closed without merging*... 😞';
      break;
  }

  return 'Your PR: *' + pr + '* has been *' + action + '* ' + extra + '\n\n' + link;
};

module.exports = function (data) {
  var pr_author = data.pull_request.user.login;

  controller.storage.users.all(function (err, users) {
    if (!err) {
      users.forEach(function (user) {
        if (user.listen_prs && user.gh_username && pr_author === user.gh_username) {
          bot.say({
            text: formatMessage(data),
            channel: user.pr_channel
          });
        }
      });
    } else {
      console.error(err);
    }
  });
};
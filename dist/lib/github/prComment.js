'use strict';

var _require = require('../controller');

var controller = _require.controller;
var bot = _require.bot;


var formatMessage = function formatMessage(data) {
  var author = data.comment.user.login;
  var link = data.comment.html_url;
  var comment = data.comment.body;
  var pr = data.pull_request ? data.pull_request.title : data.issue.title;

  return 'New comment on your PR: *' + pr + '*\n\n>>> *' + author + '* commented:\n_' + comment + '_\n\n' + link;
};

module.exports = function (data) {
  var pr_author = data.pull_request ? data.pull_request.user.login : data.issue.user.login;

  controller.storage.users.all(function (err, users) {
    if (!err) {
      users.forEach(function (user) {
        if (user.listen_prs && user.gh_username && pr_author === user.gh_username) {
          bot.say({
            text: formatMessage(data),
            channel: user.private_channel
          });
        }
      });
    } else {
      console.error(err);
    }
  });
};
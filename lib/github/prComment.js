const { controller, bot } = require('../controller');

const formatMessage = data => {
  let author  = data.comment.user.login;
  let link    = data.comment.html_url;
  let comment = data.comment.body;
  let pr      = data.pull_request ? data.pull_request.title : data.issue.title;

  return `New comment on your PR: *${pr}*

>>> *${author}* commented:
_${comment}_

${link}`;

};

module.exports = ( data ) => {
  let pr_author = data.pull_request ? data.pull_request.user.login : data.issue.user.login;

  controller.storage.users.all((err, users) => {
    if (!err) {
      users.forEach((user) => {
        if (user.listen_prs && user.gh_username && pr_author === user.gh_username) {
          bot.say({
            text: formatMessage(data),
            channel: user.private_channel
          });
        }
      })
    } else {
      console.error(err);
    }
  });

};

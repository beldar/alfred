const { controller, bot } = require('../controller');

const formatMessage = data => {
  let action  = data.action;
  let link    = data.pull_request.html_url;
  let pr      = data.pull_request.title;
  let extra   = '';

  switch(action) {
    case 'labeled':
      extra = `*_${data.label.name}_*`;
      break;
    case 'assigned':
    case 'unassigned':
      extra = `to *${data.assignee.login}*`;
      break;
    case 'closed':
      if (data.pull_request.merged) {
        return `Your PR: *${pr}* has been *merged*!! 🎉🎉🎉

${link}`;
      }

      return `Your PR: *${pr}* has been *closed without merging*... 😞`;
      break;
  }

  return `Your PR: *${pr}* has been *${action}* ${extra}

${link}`;

}

module.exports = ( data ) => {
  let pr_author = data.pull_request.user.login;

  controller.storage.users.all((err, users) => {
    if (!err) {
      users.forEach((user) => {
        if (user.listen_prs && user.gh_username && pr_author === user.gh_username) {
          bot.say({
            text: formatMessage(data),
            channel: user.pr_channel
          });
        }
      })
    } else {
      console.error(err);
    }
  });

};

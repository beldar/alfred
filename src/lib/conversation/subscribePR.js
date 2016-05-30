const { controller } = require('../controller');
const utils          = require('../utils');

const askUsername = (response, convo) => {
    convo.ask('Could I ask for your Github username sir?', (response, convo) => {
      let gh_username = response.text;
      let private_channel = response.channel;
      let listen_prs = true;

      let userData = {
        gh_username,
        private_channel,
        listen_prs
      };

      controller.storage.users.get(response.user, function(err, user) {
        if (err) return utils.handleStorageError(err, convo, '', true);

        if (!user) {
          user = {
              userId: message.user,
          };
        }

        user = Object.assign(user, userData);

        controller.storage.users.save(user, function(err, id) {
          if (err) return utils.handleStorageError(err, convo, '', true);

          convo.say(`Excellent sir, from now on you'll receive a message every time that there's an update with your PRs`);
          convo.next();
        });
      });
    });
};

module.exports = (bot, message) => {
  bot.startPrivateConversation(message, askUsername);
};

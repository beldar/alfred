const { controller } = require('../controller');
const utils          = require('../utils');

module.exports = (bot, message) => {
  controller.storage.users.get(message.user, function(err, user) {
    if (err) return utils.handleStorageError(err, bot, message);
    
    if (user && user.private_channel) return;

    if (!user) {
      user = {
          userId: message.user
      };
    }
    user.private_channel = message.channel;

    controller.storage.users.save(user, function(err, id) {
      if (err) return utils.handleStorageError(err, bot, message);
    });
  });
};

const controller = require('../controller');

module.exports = (bot, message) => {
  console.log(message);
  controller.storage.users.get(message.user, function(err, user) {
    console.log(user);
    if (user && user.name) {
        bot.reply(message, 'Hello ' + user.name + ', how may I serve you? Write `help` to see some options.');
    } else {
        bot.reply(message, 'Hello sir, how may I serve you? Write `help` to see some options.');
    }
  });
};

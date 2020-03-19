const { controller } = require('../controller');
const utils          = require('../utils');
const assignReview   = require('../github/assignReview');

module.exports = (bot, message) => {
  controller.storage.channels.get(message.channel, function(err, channel) {
    if (err) return utils.handleStorageError(err, bot, message);

    if (!channel || !channel.rota || !channel.rota.length) {
      bot.reply(message, `I'm afraid I don't have a record of any rota being set.`)
    } else {
      channel.rota.sort((a, b) => {
        if (a.user === `<@${message.user}>`) {
          return 1
        }
        if (b.user === `<@${message.user}>`) {
          return -1
        }
        if (a.count < b.count) {
          return -1
        }
        if (a.count > b.count) {
          return 1
        }
        if (a.last) {
          return 1
        }
        if (b.last) {
          return -1
        }

        return 0
      })
      const pick = channel.rota[0]
      channel.rota.forEach(u => u.last = false)
      pick.count++
      pick.last = true

      let user = controller.storage.users.get(pick.user)
      if (user && user.githubUsername && user.githubToken && message.match[1]) {
        const link = message.match[1]
        assignReview(link, user.githubUsername).then(() => {
          bot.reply(message, `The rota pick is *${pick.user}* (${user.githubUsername}) with a count of *${pick.count}*`)
        }).catch(error => {
          bot.reply(message, `The rota pick is *${pick.user}* with a count of *${pick.count}*\n_Could not assign PR in GitHub: ${error.message}_`)
        })
      } else {
        bot.reply(message, `The rota pick is *${pick.user}* with a count of *${pick.count}*`)
      }

      controller.storage.channels.save(channel, function(err, id) {
        if (err) return utils.handleStorageError(err, bot, message);
      });
    }
  });
};

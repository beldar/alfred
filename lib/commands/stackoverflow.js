const fetch = require('node-fetch');
const utils = require('../utils');

const baseUrl = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&site=stackoverflow';

module.exports = (bot, message) => {
  let tag = utils.cleanString(message.match[1]);
  let query = utils.cleanString(message.match[2]);

  let url = `${baseUrl}&tagged=${tag}&q=${encodeURIComponent(query)}`;

  fetch(url)
  .then(res => res.json())
  .then(res => {
    if (res.items.length) {
      bot.reply(message, `Here's the best result I could find:\n ${res.items[0].link}`);
      return;
    }

    bot.reply(message, `I couldn't find any results for that query Sir`);
  })
  .catch(err => {
    console.error('Stackoverflow error: ', url, err);
    bot.reply(message, `I couldn't find any results for that query Sir`);
  })
};

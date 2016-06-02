const wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);
const utils   = require('../utils');

module.exports = (bot, message) => {
  wolfram.query(message.text, function(err, result) {
    console.log(result);

    if (err || !result.length) {
      if (err) console.error('Wolfram error:', err);

      bot.reply(message, `I'm afraid I can't answer that Sir`);
      return;
    }

    let first3 = result.slice(0, 3);
    let rest = result.slice(4);

    bot.startConversation(message, (err, convo) => {
      let attachments = first3.map(item => {
        return {
          fallback: item.subpods[0].value,
          title: item.title,
          image_url: item.subpods[0].image
        };
      });

      convo.say({
        text: `Here's what I found:`,
        attachments: attachments
      });

      if (!rest.length) return;

      convo.ask('Would you like to know more?', [
        {
          pattern: bot.utterances.yes,
          callback: function(response,convo) {
            let attachments = rest.map(item => {
              return {
                fallback: item.subpods[0].value,
                title: item.title,
                image_url: item.subpods[0].image
              };
            });

            convo.say({
              text: `🤓`,
              attachments: attachments
            });
            convo.next();
          }
        },
        {
          pattern: bot.utterances.no,
          callback: function(response,convo) {
            utils.addReaction(bot, response, '+1');
            // do something else...
            convo.next();
          }
        },
        {
          default: true,
          callback: function(response,convo) {
            convo.stop();
          }
        }
      ])
    });

  })
};

# Alfred Slack Bot

Your personal butler created using [BotKit](https://github.com/howdyai/botkit)

## Installation

To install all dependencies just run

    npm install

You also need a [mongo database running](https://docs.mongodb.com/manual/installation/)

To run Alfred you need some environment variables:

- `FORECAST_API_KEY` for the weather service, get one [from here](https://developer.forecast.io/)
- `GM_API_KEY` for the geocoding service used by time or weather, get one [from here](console.developers.google.com)
- `SLACK_TOKEN` to be able to receive and send messages from slack

To set up Alfred on your Slack team at `Custom integrations > Bots` you will be able to set your bot's name, handle and you will get the `SLACK_TOKEN`.

## Run

To run Alfred just do

    npm start

## Collaborate

Adding new features to Alfred is really easy and can be done in two steps:

The first step is to add your feature on `src/lib/commands/index.js` like this:

    {
      patterns: ['call me (.*)', 'my name is (.*)'],
      scope   : normalScope,
      handler : 'name',
      help    : 'Say `my name is {name}` or `call me {name}` if you want me to remember your name'
    }

- `patterns` is an array with all things you want Alfred to be listening to as a trigger, these really are regular expressions so you can take advantage to matching patterns, in this example we want to match whatever comes after `call me` or `my name is`.

- `scope` are the events when Alfred should be listening, the `normalScope` is `direct_message,direct_mention,mention` which should work for most cases.

- `handler` is the name of the file of your handler and it should be placed inside the `src/lib/commands` folder, on this example the file is `src/lib/commands/name.js`.

- `help` is the explanation for your feature that will appear when someone asks for `help`.



The second step is to create the `handle` function, lets look at the example:

    const { controller } = require('../controller');
    const utils          = require('../utils');

    module.exports = (bot, message) => {
      let name = message.match[1];

      controller.storage.users.get(message.user, function(err, user) {
        if (err) return utils.handleStorageError(err, bot, message);

        if (!user) {
          user = {
            userId: message.user
          };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
          if (err) return utils.handleStorageError(err, bot, message);

          utils.addReaction(bot, message, '+1');
          bot.reply(message, 'Understood. I will call you ' + user.name + ' from now on.');
        });
      });
    };

Like you see our handler receives two arguments `bot` and `message`.

The `bot` variable will allow us to reply to the message.

The `message` is an object that contains several things like:

- All the matched strings from our regexp
- The text of the message
- The user id who triggered the message
- The channel
- etc

If we need to access the storage to save or retrieve information about the current user we need to import the controller (as seen on the first line).

And also import the utils module to handle possible storage errors for us.

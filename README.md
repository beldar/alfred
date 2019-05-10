# Alfred Slack Bot

Your personal butler created using [BotKit](https://github.com/howdyai/botkit)

## Installation

To install all dependencies just run

    npm install

You also need a [mongo database running](https://docs.mongodb.com/manual/installation/)

To run Alfred you need some environment variables:

- `FORECAST_API_KEY` for the weather service, get one [from here](https://developer.forecast.io/)
- `GM_API_KEY` for the geocoding service used by time or weather, get one [from here](console.developers.google.com)
- `WOLFRAM_APPID` for the wolfram integration, get one [from here](http://products.wolframalpha.com/api/)
- `SLACK_TOKEN` to be able to receive and send messages from slack

To set up Alfred on your Slack team you need to add the `Bots` integration, you can search on it or go to `http://<your slack domain>/apps/new/A0F7YS25R-bots`. You will be able to set your bot's name, handle and you will get the `SLACK_TOKEN`.

## Run

To run Alfred just do

    npm start

## Current commands

• Say `hi` or `hello` to receive a greating

• Say `my name is {name}` or `call me {name}` if you want me to remember your name

• Say `help` to get these options

• Say `subscribe to my PRs` to get messages about the updates on your PRs

• Say `unsubscribe from PRs` to stop receiving the updates on your PRs

• Say `weather {location}` to get a forecast

• Say `greet` or `greetings` to make me greet everyone

• Say `time {location}` to get a local time

• Say `stackoverflow {language/tag} {query}` to get the first result on stackoverflow for that query

• Say `random pick set {comma separated list}` to set up the list for a random pick, this could be people's names or any other list of things

• Say `random pick get` to get a random pick from a list set before hand

All non matched commands will be resolved using the [`wolfram`](lib/commands/wolfram.js) command.

## Collaborate

Adding new features to Alfred is really easy and can be done in two steps:

The first step is to add your feature on `lib/commands/index.js` like this:

    {
      patterns: ['call me (.*)', 'my name is (.*)'],
      scope   : normalScope,
      handler : 'name',
      help    : 'Say `my name is {name}` or `call me {name}` if you want me to remember your name'
    }

- `patterns` is an array with all things you want Alfred to be listening to as a trigger, these really are regular expressions so you can take advantage to matching patterns, in this example we want to match whatever comes after `call me` or `my name is`.

- `scope` are the events when Alfred should be listening, the `normalScope` is `direct_message,direct_mention,mention` which should work for most cases.

- `handler` is the name of the file of your handler and it should be placed inside the `lib/commands` folder, on this example the file is `lib/commands/name.js`.

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

And also import the utils module to handle possible storage errors for us and add a reaction to the message.

You can also do more complex things like a [multi-message conversation](https://github.com/howdyai/botkit#botstartprivateconversation) check an example on the [subscribePR file](lib/commands/subscribePR.js).

Once you've created your feature, submit a PR!

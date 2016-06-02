const normalScope = 'direct_message,direct_mention,mention';

module.exports = [
  {
    patterns: ['hello\\b', 'hi\\b'],
    scope   : normalScope,
    handler : 'hi',
    help    : 'Say `hi` or `hello` to receive a greating'
  },
  {
    patterns: ['call me (.*)', 'my name is (.*)'],
    scope   : normalScope,
    handler : 'name',
    help    : 'Say `my name is {name}` or `call me {name}` if you want me to remember your name'
  },
  {
    patterns: ['help'],
    scope   : normalScope,
    handler : 'help',
    help    : 'Say `help` to get these options'
  },
  {
    patterns: ['subscribe to my PRs', 'subscribe to PRs'],
    scope   : normalScope,
    handler : 'subscribePR',
    help    : 'Say `subscribe to my PRs` to get messages about the updates on your PRs'
  },
  {
    patterns: ['unsubscribe from my PRs', 'unsubscribe from PRs'],
    scope   : normalScope,
    handler : 'unsubscribePR',
    help    : 'Say `unsubscribe from PRs` to stop receiving the updates on your PRs'
  },
  {
    patterns: ['weather (.*)$'],
    scope   : normalScope,
    handler : 'weather',
    help    : 'Say `weather {location}` to get a forecast'
  },
  {
    patterns: ['greet', 'greetings'],
    scope   : normalScope,
    handler : 'greeting',
    help    : 'Say `greet` or `greetings` to make me greet everyone'
  },
  {
    patterns: ['time (.*)$'],
    scope   : normalScope,
    handler : 'timezone',
    help    : 'Say `time {location}` to get a local time'
  },
  {
    patterns: ['stackoverflow ([^\\s]+) (.*)$'],
    scope   : normalScope,
    handler : 'stackoverflow',
    help    : 'Say `stackoverflow {language/tag} {query}` to get the first result on stackoverflow for that query'
  },



  //Add items above this one, this should always be the last item
  {
    patterns: ['(.*)'],
    scope   : normalScope,
    handler : 'wolfram'
  }
];

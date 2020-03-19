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
  {
    patterns: ['random pick set (.*)$'],
    scope   : normalScope,
    handler : 'randomPickSet',
    help    : 'Say `random pick set {comma separated list}` to set up the list for a random pick, this could be people\'s names or any other list of things'
  },
  {
    patterns: ['random pick get'],
    scope   : normalScope,
    handler : 'randomPickGet',
    help    : 'Say `random pick get` to get a random pick from a list set before hand'
  },
  {
    patterns: ['rota pick set (.*)$'],
    scope   : normalScope,
    handler : 'rotaPickSet',
    help    : 'Say `rota pick set {comma separated list}` to set up the list for a rota pick, this could be people\'s names or any other list of things'
  },
  {
    patterns: ['rota pick get', 'rota pick get (https:\/\/github.com\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\/pull\/\d+)'],
    scope   : normalScope,
    handler : 'rotaPickGet',
    help    : 'Say `rota pick get` to get a rota pick from a list set before hand. If you append a GitHub PR link, I will try to assign a reviewer to it'
  },
  {
    patterns: ['my github username is (.*)'],
    scope: normalScope,
    handler: 'githubUsernameSet',
    help: 'Say `my github username is {username}` if you want me to remember your GitHub username'
  },
  {
    patterns: ['my github token is ([a-z0-9])'],
    scope: normalScope,
    handler: 'githubTokenSet',
    help: 'Say `my github token is {token}` if you want me to remember your GitHub token. You can generate a personal access token in Settings / Developer settings',
  },



  //Add items above this one, this should always be the last item
  {
    patterns: ['(.*)'],
    scope   : normalScope,
    handler : 'wolfram'
  }
];

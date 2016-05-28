const normalScope = 'direct_message,direct_mention,mention';

module.exports = [
  {
    patterns: ['hello', 'hi'],
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
  }
];

'use strict';

var normalScope = 'direct_message,direct_mention,mention';

module.exports = [{
  patterns: [],
  scope: 'direct_message',
  handler: 'savePrivateChannel'
}, {
  patterns: ['hello', 'hi'],
  scope: normalScope,
  handler: 'hi',
  help: 'Say `hi` or `hello` to receive a greating'
}, {
  patterns: ['call me (.*)', 'my name is (.*)'],
  scope: normalScope,
  handler: 'name',
  help: 'Say `my name is {name}` or `call me {name}` if you want me to remember your name'
}, {
  patterns: ['help'],
  scope: normalScope,
  handler: 'help',
  help: 'Say `help` to get these options'
}, {
  patterns: ['subscribe to my PRs', 'subscribe to PRs'],
  scope: normalScope,
  handler: 'subscribePR',
  help: 'Say `subscribe to my PRs` to get messages about the updates on your PRs'
}, {
  patterns: ['unsubscribe from my PRs', 'unsubscribe from PRs'],
  scope: normalScope,
  handler: 'unsubscribePR',
  help: 'Say `unsubscribe from PRs` to stop receiving the updates on your PRs'
}, {
  patterns: ['weather (.*)$'],
  scope: normalScope,
  handler: 'weather',
  help: 'Say `weather {location}` to get a forecast'
}];
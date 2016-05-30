'use strict';

if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var _require = require('./lib/controller');

var controller = _require.controller;

var commands = require('./lib/conversation');
var convBase = './lib/conversation/';
var server = require('./lib/server');
var config = require('./config');
var port = process.env.PORT || config.SERVER_PORT;

commands.forEach(function (command) {
  controller.hears(command.patterns, command.scope, require(convBase + command.handler));
});

console.log('PORT: ', port);
controller.setupWebserver(port, server);

/**
 * Message structure
 *
{
  type: 'message',
  channel: 'D1CFPCPL4',
  user: 'U0JNTST1Q',
  text: 'hi there',
  ts: '1464458078.000012',
  team: 'T03J4B99C',
  event: 'direct_message',
  match: [ 'hi', index: 0, input: 'hi there' ]
}
 */
if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const { controller } = require('./lib/controller');
const commands   = require('./lib/commands');
const commBase   = './lib/commands/';
const server     = require('./lib/server');
const config     = require('./config');
const port       = (process.env.PORT || config.SERVER_PORT);
const ip         = (process.env.OPENSHIFT_NODEJS_IP || config.IP);
const express    = require('express');
const bodyParser = require('body-parser');

//Load all commands
commands.forEach(command => {
  controller.hears(command.patterns, command.scope, require(commBase + command.handler));
});

//controller.setupWebserver(port, server);

const webserver = express();
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.listen(port, ip, () => {
  console.log(`Listening on ${ip}:${port}`);
  server(webserver);
});

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

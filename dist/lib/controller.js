'use strict';

var Botkit = require('botkit');
var config = require('../config');

var storage = process.env.OPENSHIFT_DATA_DIR || config.JSON_STORAGE;

console.log('===> Setting storage: ', storage);

var controller = Botkit.slackbot({
    debug: true,
    json_file_store: storage
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

module.exports = { controller: controller, bot: bot };
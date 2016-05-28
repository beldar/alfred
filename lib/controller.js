const Botkit = require('botkit');
const config = require('../config');

const controller = Botkit.slackbot({
    debug: true,
    json_file_store: config.JSON_STORAGE
});

const bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

module.exports = controller;

const Botkit = require('botkit');
const config = require('../config');

const storage = (process.env.OPENSHIFT_DATA_DIR || config.JSON_STORAGE);

console.log('===> Setting storage: ', storage);

const controller = Botkit.slackbot({
    debug: true,
    json_file_store: storage
});

const bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

module.exports = { controller, bot };

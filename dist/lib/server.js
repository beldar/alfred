'use strict';

var prComment = require('./github/prComment');
var prUpdate = require('./github/prUpdate');

module.exports = function (err, server) {
  server.post('/webhooks', function (req, res) {

    var data = req.body;
    console.log('Webhook event received', data);
    console.log(req.headers);

    var event = req.headers['x-github-event'];

    switch (event) {
      case 'pull_request':
        prUpdate(data);
        break;
      case 'pull_request_review_comment':
      case 'issue_comment':
      case 'commit_comment':
        prComment(data);
        break;

      default:
        console.log('Event not recognized: ', event);
    }
    res.send();
  });
};
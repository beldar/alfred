const PRComment = require('./github/PRComment');

module.exports = (err, server) => {
  server.post('/webhooks', (req, res) => {

    let data = req.body;
    console.log('Webhook event received', data);
    console.log(req.headers);

    let event = req.headers['x-github-event'];

    switch(event) {
      case 'pull_request':

        break;
      case 'pull_request_review_comment':
        PRComment(data);
        break;

      case 'commit_comment':

        break;

      default:
        console.log('Event not recognized: ', event);
    }
    res.send();
  })
};

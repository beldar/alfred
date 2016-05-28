module.exports = (err, server) => {
  server.post('/webhooks', (req, res) => {
    let body = req.body;
    console.log('Webhook event received', body);
    console.log(typeof body);
    res.send();
  })
};

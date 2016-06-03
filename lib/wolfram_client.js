const fetch = require('node-fetch');
const xml   = require('xml2js');

const Client = exports.Client = function Client(appKey) {
  this.appKey = appKey
}

Client.prototype.query = function(input, cb) {
  if(!this.appKey) {
    return cb("Application key not set", null)
  }

  const uri = 'http://api.wolframalpha.com/v2/query?input=' + encodeURIComponent(input) + '&primary=true&appid=' + this.appKey

  fetch(uri)
  .then(res => res.text())
  .then(body => {
    xml.parseString(body, (err, result) => {
      if (err) {
        console.error('XML Parse error:', err.stack);
        return cb(err, null);
      }
      console.log(result);
      let root = result.queryresult;

      if(root.$.error != 'false') {
        console.error('Wolfram error', JSON.stringify(root, null, 2));
        return cb(root.$.error, null)
      }

      let pods = root.pod.map(pod => {
     	  let title = pod.$.title;
        let subpods = pod.subpod.map(node => {
          return {
            title: node.$.title,
            value: node.plaintext,
            image: node.img.length ? node.img[0].$.src : ''
          };
        })
        let primary = (pod.primary && pod.primary == 'true');
        return { title : title, subpods: subpods, primary: primary };
      });

      return cb(null, pods);
    });
  })
  .catch(err => {
    console.error('Wolfram fetch error', err.stack);
    return cb(error, null);
  })
}

module.exports.createClient = function(appKey) {
  return new Client(appKey)
}

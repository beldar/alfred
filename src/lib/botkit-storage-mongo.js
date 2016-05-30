var mongojs = require('mongojs');

/**
* botkit-storage-mongo - MongoDB driver for Botkit
*
* @param  {Object} config Must contain a mongoUri property
* @return {Object} A storage object conforming to the Botkit storage interface
*/
module.exports = function(config) {
  /**
  * Example mongoUri is:
  * 'mongodb://test:test@ds037145.mongolab.com:37145/slack-bot-test'
  * or
  * 'localhost/mydb,192.168.1.1'
  */
  if (!config || !config.mongoUri) {
    throw new Error('Need to provide mongo address.');
  }

  var db = mongojs(config.mongoUri),
  storage = {};

  ['teams', 'channels', 'users'].forEach(function(zone) {
    storage[zone] = getStorage(db, zone);
  });

  storage.close = function() {
    db.close();
  };

  return storage;
};

/**
* Creates a storage object for a given "zone", i.e, teams, channels, or users
*
* @param {Object} db A reference to the MongoDB instance
* @param {String} zone The table to query in the database
* @returns {{get: get, save: save, all: all}}
*/
function getStorage(db, zone) {
  var table = db.collection(zone);

  return {
    get: function(userId, cb) {
      table.findOne({userId: userId}, cb);
    },
    save: function(data, cb) {
      delete data._id;
      table.findOne({userId: data.userId}, function(err, doc) {
        if (!doc) {
          table.insert(data, cb);
        } else {
          table.findAndModify({
            query: {userId: data.userId},
            update: { $set: data },
            new: true
          }, cb);
        }
      });

    },
    all: function(cb) {
      table.find({}, cb);
    }
  };
}

/*
* Donate model on link mode
*
* 'entity' collection
* {
*   _id: ObjectID(),
*   org: '萌卡',
*   url: 'mycard', // e.g., https://example.com/u/mycard
*   logo_url: 'https://my-card.in/img/logo.png',
*   intro: 'This is a test donate page.',
*   payments: [
*       { alipay: 'alipay_account' }
*   ]
* }
*
* */

var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongodb, { db: { native_parser: true, w : 1 } }, function(err, db) {
    if (err) {
        throw err;
    }

    var collection = db.collection('entity');

    exports.getEntity = function(url, callback) {
        collection.findOne({
            url: url
        }, function(err, entity) {
            if (err) {
                return callback(err, null);
            }
            callback(null, entity);
        });
    }

});
var express = require('express');
var router = express.Router();
var config = require('../config');

if (config.mode === 'link') {
    var donate = require('../models/donate-link');
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/:entity_url', checkURL, function(req, res) {
    donate.getEntity(req.params.entity_url, function(err, entity) {
        if (err) {
            console.log(err.message);
            return res.send(500);
        }

        res.render('donate', {
            entity: entity,
            mode: config.mode
        });
    });
});

module.exports = router;

// check request string is alphanumeric
function checkURL(req, res, next) {
    var urlPattern = new RegExp(/^[a-z0-9_-]+$/);

    if (urlPattern.test(req.params.entity_url)) {
        next();
    } else {
        return res.send(400);
    }
}

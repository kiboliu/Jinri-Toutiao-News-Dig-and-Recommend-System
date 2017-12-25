var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    news = [
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    },
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    },
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    },
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    },
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    },
    {
        'url':'http://lalala.com',
        'title':'test',
        'description':'test',
        'source':'test',
        'urlToImage':'test',
        'digest':'test',
        'reason':'test'
    }
    ];
    res.json(news);
});

module.exports = router;
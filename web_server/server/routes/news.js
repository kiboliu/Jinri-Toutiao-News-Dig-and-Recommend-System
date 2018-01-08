var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    news = backend_server.getNews();
    res.json(news);
});

module.exports = router;
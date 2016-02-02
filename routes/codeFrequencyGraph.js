var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  console.log("Logged into code frequency graph");
  res.render('index', { title: 'Code Frequency- Additions and Deletions per week' });
});

module.exports = router;

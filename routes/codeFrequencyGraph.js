var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('codeFrequency', { title: 'Code Frequency- Additions and Deletions per week' });
});

module.exports = router;

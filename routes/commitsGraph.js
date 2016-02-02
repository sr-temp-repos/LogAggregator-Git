var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  console.log("Logged");
  res.render('commitsGraph', { title: 'Number Of commits Per Week' });
});

module.exports = router;

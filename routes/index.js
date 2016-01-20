var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code Frequency Chart' });
});

router.get('/name', function(req, res, next) {
  res.render('index', { title: 'Code Frequency Chart' });
});

router.get('/users',function(req,res,next) {
  console.log("Inside index users");
  next();
})
module.exports = router;

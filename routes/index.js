var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('contributors', { title: 'Contributors Graph' } );
});

module.exports = router;

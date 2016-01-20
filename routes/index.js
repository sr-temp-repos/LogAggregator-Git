var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Code Frequency Chart' });
});
router.get("/codeFrequencyData",function(req,res,next){
  var jsonData = fs.readFileSync("data/codeFrequency.json");
  jsonData = JSON.parse(jsonData);
  res.json(jsonData);
});

router.get('/codeFrequencyGraph', function(req, res, next) {
  res.render('index', { title: 'Code Frequency Chart' });
});

router.get('/commitsGraph', function(req, res, next) {
  res.render('index', { title: 'Code Frequency Chart' });
});
//
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Code Frequency Chart' });
// });

module.exports = router;

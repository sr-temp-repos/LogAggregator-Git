var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET contributors page. */
router.get('/', function(req, res) {
  res.render('contributors', { title: 'Express' });
});

/* GET Overall Contributors data */
router.get('/cd', function(req, res) {
 var contributorsJsonData = fs.readFileSync("data/jsonFileForOverallCommitsForContributorsGraph.json");
 contributorsJsonData = JSON.parse(contributorsJsonData);
 res.json(contributorsJsonData);
});

/* GET Authors Contributors data */
router.get('/:no?', function(req, res) {
  var no = req.params.no;
  var fileToLoad = "data/jsonsAuthor/AuthorRank_" + no + ".json";
 var AuthorsJsonData = fs.readFileSync(fileToLoad);
 AuthorsJsonData = JSON.parse(AuthorsJsonData);
 res.json(AuthorsJsonData);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get("/",function(req,res,next){
  var jsonData = fs.readFileSync("data/commitsJson.json");
  jsonData = JSON.parse(jsonData);
  res.json(jsonData);
});

module.exports = router;

 var express = require('express');
var router = express.Router();
var fs = require('fs');
var code_converter = require('./masterJsontoCommitJson');
var mongoose = require('mongoose');
var schema = require('./org_data_schema');

router.get("/",function(req,res,next){
  //var jsonData = fs.readFileSync("data/commitsJson.json");
  //jsonData = JSON.parse(jsonData);

  mongoose.connect('mongodb://localhost:27017/wipro');

  var commit_data = mongoose.model('commit_data',schema);
  var jsonData =[];

  console.log("we are at the coorect position");
  console.log(jsonData);
  //reading the file from the database
  commit_data.find({ },{"commitDate":1,"_id":0,"author":1},function(error,data){
    if(error){
      console.log("Not able to retrive the data from mongo");
    }
    else{
      console.log("We are successful in retriving the data from mongo");
      console.log(data);
      //console.log(code_converter);
      code_converter.sayhello();
      jsonData = code_converter.convert_json_type(data);
      console.log(jsonData);
      mongoose.connection.close();
      res.json(jsonData);
    }
  });
});

module.exports = router;

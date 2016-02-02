var express = require('express');
var router = express.Router();
var code_freq_json = require('./codeFrequencyJson');
//var fs = require('fs');
var mongoose = require('mongoose');
var schema = require('./org_data_schema');


router.get("/",function(req,res,next){
  mongoose.connect('mongodb://localhost:27017/wipro');
  var code_freq_data = mongoose.model('commit_datas',schema);
  var json = [];
  code_freq_data.find({ },{"commitDate":1,"insertion":1,"deletion":1,"_id":0},function(error,data){
    if(error){
      console.log("We are not able to fetch the data from database");
    }
    else{
      console.log("We are able to fetch the data from database");
      console.log(data.length);
      json=code_freq_json.code_frequency_plot(data);
      mongoose.connection.close();
      res.json(json);
    }
  });
  //var jsonData = fs.readFileSync("data/codeFrequency.json");
  // jsonData = JSON.parse(jsonData);
  // res.json(jsonData);
});

module.exports = router;

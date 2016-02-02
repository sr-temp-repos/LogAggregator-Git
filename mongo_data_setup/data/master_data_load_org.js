var mongoose = require('mongoose');
var schema =require('./master_data_schema_orgs');
var fs = require('fs');
mongoose.connect('mongodb://localhost:27017/masterdb');
//console.log(schema);
var orgs = mongoose.model('org',schema);

fs.readFile('./organization100.json',function(error,data){
  if(error){
    console.log(error);
  }
  else
  {
    console.log("We have the data with us");
    var json= JSON.parse(data);
    console.log(json.length);
    for(var i=0;i<json.length;i++)
    {
      var orgs_new = new orgs(json[i]);
      //console.log(json[i]);
       orgs_new.save(function(error,doc){
       if(error) {
         console.log(error);
       }
       else {
         console.log(doc);
       }
       });
    }

  }

});

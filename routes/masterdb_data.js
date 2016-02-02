var mongoose = require('mongoose');
var schema = require('./master_data_schema');
var schema1= require('./org_data_schema');
var dbs = 'masterdb';
var url = 'mongodb://localhost:27017/' + dbs;
mongoose.connect(url);


var data = mongoose.model('githubs',schema);


data.find({organizationName: 'myworks'},function(error,data){
  if(error){
    console.log("we are not able to connect master database");
  }
  else{
    console.log("we are able to fetch the data");
    console.log(data);

  mongoose.connection.close();
  mongoose.connect('mongodb://localhost:27017/wipro');
  var data1 = mongoose.model('commit_datas',schema1);
  data1.find({ },function(error,data1){
    if(error){
      console.log("not able to fetch the data");
    }
      else{
        console.log(data1);
      }
      mongoose.connection.close();
  });
 }
});

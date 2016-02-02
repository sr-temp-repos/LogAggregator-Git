var mongoose =  require('mongoose');
var schema = require("./master_data_schema");

exports.insertdatatomaster = function(data){
  mongoose.connect('mongodb://localhost:27017/masterdb');

  var repoOrgData = mongoose.model('githubs',schema);

  var newRepoData = new repoOrgData(data);

  newRepoData.save(function(error){
    if(error){
      console.log('there is an error in insertion');
    }
    else{
      console.log('we are able to add the file');
      mongoose.connection.close();
    }
  });
}

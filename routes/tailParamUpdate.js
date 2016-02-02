var mongoose = require('mongoose');
var schema = require('./master_data_schema');



exports.tailParamUpdate = function(_id,repo,tailParamValue){
  mongoose.connect('mongodb://localhost:27017/masterdb');

  var githubs = mongoose.model('githubs',schema);

  githubs.find({"_id":_id},function(error,data){
    if(error){
      console.log("we are not able to fetch the data");
    }
    else{
      for(var i=0;i<data.length;i++){
        console.log(data[i].repositoryData.length);
        for(var j=0; j<data[i].repositoryData.length;j++){
          if(data[i].repositoryData[j].repo==repo){
            data[i].repositoryData[j].tailParam=tailParamValue;
            console.log(data[i].repositoryData[j].tailParam);
            data[i].save(function(error){
              if(error){
                console.log("updating the doc is facing issue");
              }
              else{
                console.log(data);
              }
            });
          }
        }

      }
    }
    //console.log(data);
    mongoose.connection.close();
  });
}

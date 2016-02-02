var mongoose = require('mongoose');
var schema =require('./master_data_schema');
var fs = require('fs');
mongoose.connect('mongodb://localhost:27017/masterdb');
//console.log(schema);
var commitData = mongoose.model('github',schema);

fs.readFile('./github.json',function(error,data){
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
      var new_commit = new commitData(json[i]);
      //console.log(json[i]);
       new_commit.save(function(error,doc){
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

//inserting the data in mongo db
// var user = new User({
//   name :'Manoj Kumar',
//   email:'manoj.pusa@gmail.com'
// });
// //sconsole.log(user);
// user.save(function(error,doc){
//   if(error) {
//     console.log("We got error in saving the data");
//   }
//   else {
//     console.log(doc);
//   }
//   });

//updating the data in mongo database
//   User.findById( "56a5c17946d9897608d0d62b", function (err, doc) {
//   if (err) console.log(err);
//
//   doc.email = 'manoj.rau1986@gmail.com';
//   doc.save(function (err) {
//     if (err) console.log(err);
//     console.log(doc);
//   });
// });

  // User.find({email:"manoj.rau1986@gmail.com"},function(error,docs){
  //   if(error){
  //     console.log("Not able to find the data");
  //   }
  //   else {
  //     for(var i=0;i<docs.length;i++)
  //     {
  //       docs[i].email = 'manoj.pusa@gmail.com';
  //       docs[i].save(function (err) {
  //         if (err) console.log(err);
  //         console.log(docs);
  //         });
  //     }
  //   }
  //  });

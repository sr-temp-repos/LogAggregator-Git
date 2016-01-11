var fs = require('fs');
var path = require('path');
var jsonObj = require("./outputJsons/gitLogsMaster.json");
var jsonObjAuthor = require("./outputJsons/Top100AuthorsList.json");
var k= 0;var temp = {};var json = [];

for (var j = 0; j < jsonObjAuthor.length; j++) {
  temp = [];k=0;
  // commitValue = commitValue + 1;
  for (var i = 0; i < jsonObj.length - 1; i++) {
    if (((jsonObj[i])["authorName"]) == ((jsonObjAuthor[j])["author name"]) && ((jsonObj[i])["type"] == "Commit")) {
      temp[k] = jsonObj[i];
      k=k+1;
      //  console.log(k);
    }
  }
  json = [];var commitValue = 0;var lastCommitValue = 0;
  for(var l =0; l < temp.length; l++){
    var splittedDate = new Date(((temp[l])["date"])).toString().split(" ");
    var splittedDateLast = new Date(((temp[(temp.length - 1)]["date"]))).toString().split(" ");

    // if (((jsonObj[i])["type"]) == "Commit"){
    if((splittedDate[1] == splittedDateLast[1] )&&(splittedDate[3] == splittedDateLast[3])){
      if (((temp[l])["type"]) == "Commit"){
        lastCommitValue = lastCommitValue + 1;
      }
    }
    else{
      var splittedDateNext = new Date(((temp[l+1])["date"])).toString().split(" ");

      if ((splittedDate[1] == splittedDateNext[1] ) && (splittedDate[3] == splittedDateNext[3])) {
        if (((temp[l])["type"]) == "Commit"){
          commitValue = commitValue + 1;
        }
      }
      else {
        var tmp = {};
        tmp["month"]=splittedDate[1] + " " + splittedDate[3];
        tmp["no_Of_Commits"]= commitValue + 1;
        commitValue = 0;
        // Add object to list
        json.push(tmp);
      }
    }
  }
  var tmp = {};
  tmp["month"]=splittedDateLast[1] + " " + splittedDateLast[3];
  tmp["no_Of_Commits"]= lastCommitValue;
  // Add object to list
  json.push(tmp);
  // console.log(json);
  var authorFileLocation = path.join(__dirname, 'outputJsons/jsonsAuthor', (jsonObjAuthor[j])["author name"]+  ".json");
  fs.writeFile(authorFileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
    console.log("File  was  created successfully");
  });
  //  var authorFileLocation = path.join(__dirname, 'jsonsAuthor', j +  ".json");
  // fs.writeFile(authorFileLocation,JSON.stringify(json), 'utf8', function(err) {
  //                    console.log(j  + " was  created successfully");
  //
  //                    });
}

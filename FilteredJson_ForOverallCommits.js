var fs = require('fs');
var path = require('path');
var jsonObj = require("./outputJsons/gitLogsMaster.json");
var commitValue = 0;var lastCommitValue = 0;
var json = [];

for (var i = 0; i < jsonObj.length; i++) {
  var splittedDate = new Date(((jsonObj[i])["date"])).toString().split(" ");
  var splittedDateLast = new Date(((jsonObj[(jsonObj.length - 1)]["date"]))).toString().split(" ");

  // if (((jsonObj[i])["type"]) == "Commit"){
    if((splittedDate[1] == splittedDateLast[1] )&&(splittedDate[3] == splittedDateLast[3])){
      if (((jsonObj[i])["type"]) == "Commit"){
      lastCommitValue = lastCommitValue + 1;
    }
  }
    else{
      var splittedDateNext = new Date(((jsonObj[i+1])["date"])).toString().split(" ");

      if ((splittedDate[1] == splittedDateNext[1] ) && (splittedDate[3] == splittedDateNext[3])) {
        if (((jsonObj[i])["type"]) == "Commit"){
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
  // }
}
var tmp = {};
tmp["month"]=splittedDateLast[1] + " " + splittedDateLast[3];
tmp["no_Of_Commits"]= lastCommitValue;
// Add object to list
json.push(tmp);
// fs.writeFile('jsonFileForOverallCommits.json', JSON.stringify(json,null,'\t') , function (err)
// {
//   if (err) return console.log(err);
// });
var FileLocation = path.join(__dirname, 'outputJsons',"jsonFileForOverallCommitsForContributorsGraph.json");
fs.writeFile(FileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
  console.log("File  was  created successfully");
});

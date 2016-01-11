/*******************************************************************/
/*Authors : Aayush Aditya and Arul************************/
/*Created Date : 09-01-2015*****************************************/
/*This script converts the master json to find the per months commits done*************/

/*Import of necessary API*/
var fs = require('fs');
var path = require('path');
var jsonObj = require("./outputJsons/gitLogsMaster.json");
var commitValue = 0;//counter for adding no. of commits
var lastCommitValue = 0;//counter for finding the last entry's  no. of commits
var json = [];

//for iterating through master json
for (var i = 0; i < jsonObj.length; i++) {
  var splittedDate = new Date(((jsonObj[i])["date"])).toString().split(" ");// returns the current date splitted in an array
  var splittedDateLast = new Date(((jsonObj[(jsonObj.length - 1)]["date"]))).toString().split(" ");// returns the last date splitted in an array

  // if (((jsonObj[i])["type"]) == "Commit"){
    if((splittedDate[1] == splittedDateLast[1] )&&(splittedDate[3] == splittedDateLast[3])){
      if (((jsonObj[i])["type"]) == "Commit"){
      lastCommitValue = lastCommitValue + 1;
    }
  }
    else{
      var splittedDateNext = new Date(((jsonObj[i+1])["date"])).toString().split(" ");// returns the next to current date splitted in an array

      if ((splittedDate[1] == splittedDateNext[1] ) && (splittedDate[3] == splittedDateNext[3])) {
        if (((jsonObj[i])["type"]) == "Commit"){
        commitValue = commitValue + 1;
    }
  }
      else {
        tmp = {};
        tmp["month"]=splittedDate[1] + " " + splittedDate[3];
        tmp["no_Of_Commits"]= commitValue + 1;
        commitValue = 0;
        // Add object to list
        json.push(tmp);
      }
    }
}
tmp = {};
tmp["month"]=splittedDateLast[1] + " " + splittedDateLast[3];
tmp["no_Of_Commits"]= lastCommitValue;
// Adds object
json.push(tmp);
/*Setting the path location to write*/
var FileLocation = path.join(__dirname, 'outputJsons',"jsonFileForOverallCommitsForContributorsGraph1.json");
/*Writing the array of objects to JSON*/
fs.writeFile(FileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
  console.log("File  was  created successfully");
});

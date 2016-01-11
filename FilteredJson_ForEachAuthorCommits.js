/*******************************************************************/
/*Authors : Aayush Aditya and Arul************************/
/*Created Date : 10-01-2015*****************************************/
/*This script converts the master json to find the per months commits done*************/

/*Import of necessary API*/
var fs = require('fs');
var path = require('path');

var jsonObj = require("./outputJsons/gitLogsMaster.json");//reading the master json file
var jsonObjAuthor = require("./outputJsons/Top100AuthorsList.json");//reading the authors list json file
var k= 0;var temp = {};var json = [];
//fot iterating through the list of Authors
for (var j = 0; j < jsonObjAuthor.length; j++) {
  temp = [];k=0;
  // for iterating through the master json
  for (var i = 0; i < jsonObj.length - 1; i++) {
    // checking for authos and their commit values
    if (((jsonObj[i])["authorName"]) == ((jsonObjAuthor[j])["author name"]) && ((jsonObj[i])["type"] == "Commit")) {
      temp[k] = jsonObj[i];
      k=k+1;
    }
  }
  json = [];var commitValue = 0;//counter for adding no. of commits
  var lastCommitValue = 0;//counter for finding the last entry's  no. of commits
  for(var l =0; l < temp.length; l++){
    var splittedDate = new Date(((temp[l])["date"])).toString().split(" ");// returns the current date splitted in an array
    var splittedDateLast = new Date(((temp[(temp.length - 1)]["date"]))).toString().split(" ");// returns the last date splitted in an array

    if((splittedDate[1] == splittedDateLast[1] )&&(splittedDate[3] == splittedDateLast[3])){
      if (((temp[l])["type"]) == "Commit"){
        lastCommitValue = lastCommitValue + 1;
      }
    }
    else{
      var splittedDateNext = new Date(((temp[l+1])["date"])).toString().split(" ");// returns the next to current splitted in an array

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
  tmp = {};
  tmp["month"]=splittedDateLast[1] + " " + splittedDateLast[3];
  tmp["no_Of_Commits"]= lastCommitValue;
  // Adds object
  json.push(tmp);
// /*for creating file name withot spaces*/
//   var authorNameWithoutSpaces = "";
//   var authorNameSplit = ((jsonObjAuthor[j])["author name"]).split(" ");
//   for (var count = 0; count < authorNameSplit.length ; count++){
//     authorNameWithoutSpaces = authorNameWithoutSpaces + authorNameSplit[count];
//   }
//   console.log(authorNameWithoutSpaces);
//     /*Setting the path location to write*/
//   var authorFileLocation = path.join(__dirname, 'outputJsons/jsonsAuthor', authorNameWithoutSpaces+  ".json");
//   /*Writing the array of objects to JSON*/
//   fs.writeFile(authorFileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
//     console.log("File  was  created successfully");
//   });
   var authorFileLocation = path.join(__dirname, 'outputJsons/jsonsAuthor', "AuthorRank_" + (j+1) +  ".json");
  fs.writeFile(authorFileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
                     console.log("File was  created successfully");

                     });
}

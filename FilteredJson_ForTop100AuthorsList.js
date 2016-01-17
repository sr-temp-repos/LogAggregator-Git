// *******************************************************************/
// Authors : Aayush Aditya and Arul************************/
// Created Date : 10-01-2015*****************************************/
// This script converts the master json to find top 100 autors for the repository

// Import of necessary API
var fs = require('fs');
var path = require('path');

var inputFileLocation = path.join(__dirname, 'outputJsons', 'gitLogsMaster.json');//Setting the path location to read
var jsonObj = JSON.parse(fs.readFileSync(inputFileLocation, 'utf8'));// Read MasterJSON

var authorAndCommitsRawData=[]; //array having each author and their respective total commits value
//for iterating through master json
for (var j = 0; j < jsonObj.length; j++) {
tempVarForAuthorName=[jsonObj[j]["authorName"]];

if (authorAndCommitsRawData[tempVarForAuthorName]) {
  if((jsonObj[j]["type"] == "Commit")){
    authorAndCommitsRawData[tempVarForAuthorName] += 1;
  }
}
else {
  authorAndCommitsRawData[tempVarForAuthorName] = 1; //initializing commits value for each Authors
}
}

// converting authorAndCommitsRawData into a more friendly format...
var authorAndTheirCommitFinalData=[];
var authorAndCommitData = function (name,commit) {
  this.AuthorName=name;
  this.no_Of_Commits=commit;
}

for (var i = 0; i < Object.keys(authorAndCommitsRawData).length; i++) {//for accessing each of the keys of the authorAndCommitsRawData
  authorAndTheirCommitFinalData[i]= new authorAndCommitData
                                  (Object.keys(authorAndCommitsRawData)[i],
                                  authorAndCommitsRawData[Object.keys(authorAndCommitsRawData)[i]]);
}

console.log(authorAndTheirCommitFinalData);

authorAndTheirCommitFinalData.sort(function(a,b){//for sorting the json array created
  if((a.no_Of_Commits) > (b.no_Of_Commits)){
    return -1;
  }
  return 1;
});
  var FileLocation = path.join(__dirname, 'outputJsonsNew',"Top100AuthorsList1.json");/*Setting the path location to write*/
if(authorAndTheirCommitFinalData.length < 100){
  fs.writeFile(FileLocation,JSON.stringify(authorAndTheirCommitFinalData,null,'\t'), 'utf8', function(err) {/*Writing the array of objects to JSON File*/
    console.log("File  was  created successfully");
  });
}
else {
  var authorAndTheirCommitFinalDataTop100= authorAndTheirCommitFinalData.slice(0, 100);/*slice method used to get the top hundred data*/
  console.log(authorAndTheirCommitFinalDataTop100);
  fs.writeFile(FileLocation,JSON.stringify(authorAndTheirCommitFinalDataTop100,null,'\t'), 'utf8', function(err) {/*Writing the array of objects to JSON File*/
    console.log("File  was  created successfully");
  });
}

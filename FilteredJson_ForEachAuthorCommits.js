/*******************************************************************/
/*Authors : Aayush Aditya and Arul************************/
/*Created Date : 10-01-2015*****************************************/
/*This script converts the master json to find the per months commits done*************/

//Import of necessary API
var fs = require('fs');
var path = require('path');

var inputFileLocation = path.join(__dirname, 'outputJsonsNew', 'gitLogsMaster.json');/*Setting the path location to read*/
var inputFileLocationAuthor = path.join(__dirname, 'outputJsonsNew', 'Top100AuthorsList1.json');/*Setting the path location to read*/
var jsonObj = JSON.parse(fs.readFileSync(inputFileLocation, 'utf8'));// Read MasterJSON
var jsonObjAuthor = JSON.parse(fs.readFileSync(inputFileLocationAuthor, 'utf8'));//reading the authors list json file

var endDateMaster = new Date((jsonObj[(jsonObj.length - 1)]["date"]));// returns the last date of master Json
var startDateMaster = new Date((jsonObj[0])["date"]);// returns the first date of master Json
var k= 0;var temp = {};var json = [];
//fot iterating through the list of Authors
for (var j = 0; j < jsonObjAuthor.length; j++) {
  temp = [];k = 0;
  // for iterating through the master json
  for (var i = 0; i < jsonObj.length - 1; i++) {
    // checking for authos and their commit values
    if (((jsonObj[i])["authorName"]) == ((jsonObjAuthor[j])["AuthorName"]) && ((jsonObj[i])["type"] == "Commit")) {
      temp[k] = jsonObj[i];console.log("I am inside-----------");
      k=k+1;
    }
  }
  console.log(temp);console.log("----------------------------------------");

  json = [];var commitValue = 0;//counter for adding no. of commits
  var lastCommitValue = 0;//counter for finding the last entry's  no. of commits
  for(var l =0; l < temp.length; l++){
    var splittedDate = new Date(((temp[l])["date"]));// returns the current date in date format
    var splittedDateLast = new Date(((temp[(temp.length - 1)]["date"])));// returns the last date in date format

    if((splittedDate.getMonth() == splittedDateLast.getMonth() )&&(splittedDate.getFullYear() == splittedDateLast.getFullYear())){
      if (((temp[l])["type"]) == "Commit"){
        lastCommitValue = lastCommitValue + 1;
      }
    }
    else{
      var splittedDateNext = new Date(((temp[l+1])["date"]));// returns the next to current splitted in an array

      if ((splittedDate.getMonth() == splittedDateNext.getMonth() ) && (splittedDate.getFullYear() == splittedDateNext.getFullYear())) {
        if (((temp[l])["type"]) == "Commit"){
          commitValue = commitValue + 1;
        }
      }
      else {
        var tmp = {};
        tmp["month"]=splittedDate.getMonth() + 1;
        tmp["year"]=splittedDate.getFullYear();
        tmp["no_Of_Commits"]= commitValue + 1;
        commitValue = 0;
        // Add object to list
        json.push(tmp);
      }
    }
  }
  tmp = {};
  tmp["month"]=splittedDateLast.getMonth() + 1;
  tmp["year"]=splittedDateLast.getFullYear();
  tmp["no_Of_Commits"]= lastCommitValue;
  // Adds object

  json.push(tmp);

  var jsonZero = zeroMonths(json,monthsGeneratorOverall(startDateMaster,endDateMaster), monthsGeneratorFromJsonData(json));
  for (var i = 0; i < jsonZero.length; i++) {
    json.push(jsonZero[i]);
  }


  var authorFileLocation = path.join(__dirname, 'outputJsonsNew/jsonsAuthor', "AuthorRank_" + (j+1) +  ".json");
  fs.writeFile(authorFileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
    console.log("File was  created successfully");

  });
}
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



var totalMonths = [];var jsonsMonths = [];
function monthsGeneratorOverall(startDate,endDate){ //function to generate array of start to end months from starting to ending years of data
  jsonEndYear = parseInt(startDate.getFullYear());
  jsonStartYear = parseInt(endDate.getFullYear());totalMonths = [];
  for (var j = jsonStartYear; j <= jsonEndYear; j++){
    for (var i = 1; i <= 12; i++){
      var monthYear = i+" "+j;
       totalMonths.push(monthYear);
}
}
return(totalMonths);
}

function monthsGeneratorFromJsonData(unsortedjson){//function to generate array of each months from starting to ending of data
  jsonsMonths = [];
  for (var i =(unsortedjson.length) - 1 ; i >= 0; i--){
      var jsonmonthYear =unsortedjson[i]["month"] + " " + unsortedjson[i]["year"] ;
       jsonsMonths.push(jsonmonthYear);
}
return(jsonsMonths);
}

function zeroMonths(unsortedjson,totMonths,jsoMonth){//function generating zero values for non-occuring months
   var newArray = [];
  for(var i = 0 ; i <= totMonths.length - 1; i++){
   if(jsoMonth.indexOf(totMonths[i]) > -1){
   }
   else {
         var newObj = {};
     newObj["month"] = parseInt(totMonths[i].split(" ")[0]);
     newObj["year"] = parseInt(totMonths[i].split(" ")[1]);
     newObj["noOfCommits"] = 0;
     newArray.push(newObj);
   }
  }
  return(newArray);
};

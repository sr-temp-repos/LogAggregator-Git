//******************************************************************
//Authors : Aayush Aditya and Arul***********************
//Created Date : 09-01-2015****************************************
//This script converts the master json to find the per months commits done************

//Import of necessary API
var fs = require('fs');
var path = require('path');

var inputFileLocation = path.join(__dirname, 'outputJsons', 'gitLogsMaster.json');/*Setting the path location to read*/
// Read MasterJSON
var jsonObj = JSON.parse(fs.readFileSync(inputFileLocation, 'utf8'));

var commitValue = 0;//counter for adding no. of commits
var lastCommitValue = 0;//counter for finding the last entry's  no. of commits
var json = [];

var splittedDateLast = new Date((jsonObj[(jsonObj.length - 1)]["date"]));// returns the last date of master Json
var splittedDateFirst = new Date((jsonObj[0])["date"]);// returns the first date of master Json
//for iterating through master json
for (var i = 0; i < jsonObj.length; i++) {
  var splittedDate = new Date((jsonObj[i])["date"]);// returns the current date


  // if (((jsonObj[i])["type"]) == "Commit"){
    if((splittedDate.getMonth() == splittedDateLast.getMonth() )&&(splittedDate.getFullYear() == splittedDateLast.getFullYear())){
      if (((jsonObj[i])["type"]) == "Commit"){
      lastCommitValue = lastCommitValue + 1;
    }
  }
    else{
      var splittedDateNext = new Date(((jsonObj[i+1])["date"]));// returns the next to current date

      if ((splittedDate.getMonth() == splittedDateNext.getMonth() ) && (splittedDate.getFullYear() == splittedDateNext.getFullYear())) {
        if (((jsonObj[i])["type"]) == "Commit"){
        commitValue = commitValue + 1;
    }
  }
      else {
        tmp = {};
        tmp["month"]=splittedDate.getMonth() + 1;
        tmp["year"]=splittedDate.getFullYear();
        tmp["noOfCommits"]= commitValue + 1;
        commitValue = 0;
        // Add object to list
        json.push(tmp);
      }
    }
}
tmp = {};
tmp["month"]=splittedDate.getMonth() + 1;
tmp["year"]=splittedDateLast.getFullYear();
tmp["noOfCommits"]= lastCommitValue;
// Adds object
json.push(tmp);
var jsonZero = zeroMonths(json,monthsGeneratorOverall(splittedDateFirst,splittedDateLast), monthsGeneratorFromJsonData(json));
for (var i = 0; i < jsonZero.length; i++) {
  json.push(jsonZero[i]);
}

/*Setting the path location to write*/
var FileLocation = path.join(__dirname, 'outputJsonsNew',"jsonFileForOverallCommitsForContributorsGraph1.json");
/*Writing the array of objects to JSON*/
fs.writeFile(FileLocation,JSON.stringify(json,null,'\t'), 'utf8', function(err) {
  console.log("File  was  created successfully");
});



var totalMonths = [];var jsonsMonths = [];
function monthsGeneratorOverall(startDate,endDate){ //function to generate array of start to end months from starting to ending years of data
  jsonEndYear = parseInt(startDate.getFullYear());
  jsonStartYear = parseInt(endDate.getFullYear());totalMonths = [];
  for (var j = jsonStartYear; j <= jsonEndYear; j++){
    for (var i = 1; i <= 12; i++){
      var monthYear = i+" "+j;
      console.log(monthYear);
       totalMonths.push(monthYear);
}
}console.log(totalMonths);
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

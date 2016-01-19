//***************************************************************************************************************
//Authors : Aayush Aditya and Arul*******************************************************************************
//Created Date : 09-01-2015**************************************************************************************
// 1 . This script converts the master json to find the per months commits ,overall in the repository************
// 2 . This script converts the master json to find top 100 authors list and their commits***********************
// 3 . This script converts the master json to find the per months commits for top 100 authors*******************

//Import of necessary APIs
var fs = require('fs');
var path = require('path');

var inputFileLocation = path.join(__dirname, 'outputJsons', 'gitLogsMaster.json');/*Setting the path location to read*/
var jsonObj = JSON.parse(fs.readFileSync(inputFileLocation, 'utf8'));// Read MasterJSON

var commitValue = 0;//counter for adding no. of commits
var lastCommitValue = 0;//counter for finding the last entry's  no. of commits
var json = [];
var authorAndCommitsRawData=[]; //array having each author and their respective total commits value

var dateLast = new Date((jsonObj[(jsonObj.length - 1)]["date"]));// returns the last date of master Json
var dateFirst = new Date((jsonObj[0])["date"]);// returns the first date of master Json
function generateJsonsForOverallCommits(){
for (var i = 0; i < jsonObj.length; i++) {//for iterating through master json
  tempVarForAuthorName=[jsonObj[i]["authorName"]];
// top 100 author's list
  if (authorAndCommitsRawData[tempVarForAuthorName]) {
    if((jsonObj[i]["type"] == "Commit")){
      authorAndCommitsRawData[tempVarForAuthorName] += 1;
    }
  }
  else {
    authorAndCommitsRawData[tempVarForAuthorName] = 1; //initializing commits value for each Authors
  }

    var currentDate = new Date((jsonObj[i])["date"]);// returns the current date
  if((currentDate.getMonth() == dateLast.getMonth() )&&(currentDate.getFullYear() == dateLast.getFullYear())){
    if (((jsonObj[i])["type"]) == "Commit"){
      lastCommitValue = lastCommitValue + 1;
    }
  }
  else{
    var dateNext = new Date(((jsonObj[i+1])["date"]));// returns the next to current date

    if ((currentDate.getMonth() == dateNext.getMonth() ) && (currentDate.getFullYear() == dateNext.getFullYear())) {
      if (((jsonObj[i])["type"]) == "Commit"){
        commitValue = commitValue + 1;
      }
    }
    else {
      objectForStoringDateAndCommitData = {};
      objectForStoringDateAndCommitData["month"]=currentDate.getMonth();
      objectForStoringDateAndCommitData["year"]=currentDate.getFullYear();
      objectForStoringDateAndCommitData["noOfCommits"]= commitValue + 1;
      commitValue = 0;
      // Add object to list
      json.push(objectForStoringDateAndCommitData);
    }
  }
}
objectForStoringDateAndCommitData = {};
objectForStoringDateAndCommitData["month"]=currentDate.getMonth();
objectForStoringDateAndCommitData["year"]=dateLast.getFullYear();
objectForStoringDateAndCommitData["noOfCommits"]= lastCommitValue;
// Adds object
json.push(objectForStoringDateAndCommitData);
var jsonZero = addZeroCommitsMonths(json,monthsGeneratorOverall(dateFirst,dateLast), monthsGeneratorFromJsonData(json));
for (var i = 0; i < jsonZero.length; i++) {
  json.push(jsonZero[i]);//adding objects for each months with zero commits
}

/*Setting the path location to write*/
var fileLocation = path.join(__dirname, 'outputJsonsNew',"jsonFileForOverallCommitsForContributorsGraph1.json");
writeToFile(fileLocation,json);// Writing the array of objects to a JSON file
};

function convertAuthorAndTheirAggregatedCommitsDataInToFriendlyFormat(){// function for converting authorAndCommitsRawData into a more friendly format...
  var authorAndTheirCommitFinalData=[];
  var authorAndCommitData = function (name,commit) {
    this.AuthorName=name;
    this.noOfCommits=commit;
  }

  for (var i = 0; i < Object.keys(authorAndCommitsRawData).length; i++) {//for accessing each of the keys of the authorAndCommitsRawData
    authorAndTheirCommitFinalData[i]= new authorAndCommitData
    (Object.keys(authorAndCommitsRawData)[i],
    authorAndCommitsRawData[Object.keys(authorAndCommitsRawData)[i]]);
  }

  authorAndTheirCommitFinalData.sort(function(a,b){//for sorting the json array created
    if((a.noOfCommits) > (b.noOfCommits)){
      return -1;
    }
    return 1;
  });
  var fileLocation = path.join(__dirname, 'outputJsonsNew',"Top100AuthorsList1.json");/*Setting the path location to write*/
  if(authorAndTheirCommitFinalData.length < 100){
    writeToFile(fileLocation,authorAndTheirCommitFinalData);// Writing the array of objects to a JSON file
    return(authorAndTheirCommitFinalData);
  }
  else {
    var authorAndTheirCommitFinalDataTop100= authorAndTheirCommitFinalData.slice(0, 100);/*slice method used to get the top hundred data*/
    writeToFile(fileLocation,authorAndTheirCommitFinalDataTop100);// Writing the array of objects to a JSON file
      return(authorAndTheirCommitFinalDataTop100);
  }

};

function generateJsonsForEachAuthorsCommits(){
var k= 0;var objectForEachAuthorEntries = {};var json = [];
//fot iterating through the list of Authors
for (var j = 0; j < jsonObjAuthor.length; j++) {
  objectForEachAuthorEntries = [];k = 0;
  // for iterating through the master json
  for (var i = 0; i < jsonObj.length - 1; i++) {
    // checking for authos and their commit values
    if (((jsonObj[i])["authorName"]) == ((jsonObjAuthor[j])["AuthorName"]) && ((jsonObj[i])["type"] == "Commit")) {
      objectForEachAuthorEntries[k] = jsonObj[i];
      k=k+1;
    }
  }

  json = [];commitValue = 0;//counter for adding no. of commits
  lastCommitValue = 0;//counter for finding the last entry's  no. of commits
  for(var l =0; l < objectForEachAuthorEntries.length; l++){
    var currentDateForAuthor = new Date(((objectForEachAuthorEntries[l])["date"]));// returns the current date in date format
    var dateLastForAuthor = new Date(((objectForEachAuthorEntries[(objectForEachAuthorEntries.length - 1)]["date"])));// returns the last date in date format

    if((currentDateForAuthor.getMonth() == dateLastForAuthor.getMonth() )&&(currentDateForAuthor.getFullYear() == dateLastForAuthor.getFullYear())){
      if (((objectForEachAuthorEntries[l])["type"]) == "Commit"){
        lastCommitValue = lastCommitValue + 1;
      }
    }
    else{
      var dateNext = new Date(((objectForEachAuthorEntries[l+1])["date"]));// returns the next to current splitted in an array

      if ((currentDateForAuthor.getMonth() == dateNext.getMonth() ) && (currentDateForAuthor.getFullYear() == dateNext.getFullYear())) {
        if (((objectForEachAuthorEntries[l])["type"]) == "Commit"){
          commitValue = commitValue + 1;
        }
      }
      else {
        var objectForStoringDateAndCommitData = {};
        objectForStoringDateAndCommitData["month"]=currentDateForAuthor.getMonth();
        objectForStoringDateAndCommitData["year"]=currentDateForAuthor.getFullYear();
        objectForStoringDateAndCommitData["noOfCommits"]= commitValue + 1;
        commitValue = 0;
        // Add object to list
        json.push(objectForStoringDateAndCommitData);
      }
    }
  }
  objectForStoringDateAndCommitData = {};
  objectForStoringDateAndCommitData["month"]=dateLastForAuthor.getMonth();
  objectForStoringDateAndCommitData["year"]=dateLastForAuthor.getFullYear();
  objectForStoringDateAndCommitData["noOfCommits"]= lastCommitValue;
  // Adds object
  json.push(objectForStoringDateAndCommitData);

  var jsonZero = addZeroCommitsMonths(json,monthsGeneratorOverall(dateFirst,dateLast), monthsGeneratorFromJsonData(json));
  for (var i = 0; i < jsonZero.length; i++) {
    json.push(jsonZero[i]);//adding objects for each months with zero commits
  }
  var authorFileLocation = path.join(__dirname, 'outputJsonsNew/jsonsAuthor', "AuthorRank_" + (j+1) +  ".json");
  writeToFile(authorFileLocation,json);// Writing the array of objects to a JSON file
}
};

var totalMonths = [];var jsonsMonths = [];
function monthsGeneratorOverall(startDate,endDate){ //function to generate array of start to end months from starting to ending years of data
  jsonEndYear = parseInt(startDate.getFullYear());
  jsonStartYear = parseInt(endDate.getFullYear());totalMonths = [];
  for (var j = jsonStartYear; j <= jsonEndYear; j++){
    for (var i = 0; i <= 11; i++){
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

function addZeroCommitsMonths(unsortedjson,totMonths,jsoMonth){//function generating zero values for non-occuring months
  var newArray = [];
  for(var i = 0 ; i <= totMonths.length - 1; i++){
    if(jsoMonth.indexOf(totMonths[i]) > -1){
    }
    else {
      var objectForZeroMonthsValues = {};
      objectForZeroMonthsValues["month"] = parseInt(totMonths[i].split(" ")[0]);
      objectForZeroMonthsValues["year"] = parseInt(totMonths[i].split(" ")[1]);
      objectForZeroMonthsValues["noOfCommits"] = 0;
      newArray.push(objectForZeroMonthsValues);
    }
  }
  return(newArray);
};

function writeToFile(locationOfFile,jsonArray){ // function for writing the array of objects to a JSON file
  fs.writeFile(locationOfFile,JSON.stringify(jsonArray,null,'\t'), 'utf8', function(err) {
    console.log("File  was  created successfully");
  });
};

generateJsonsForOverallCommits();
var jsonObjAuthor = convertAuthorAndTheirAggregatedCommitsDataInToFriendlyFormat(authorAndCommitsRawData);
generateJsonsForEachAuthorsCommits();

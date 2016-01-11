/*Import of necessary API*/
var masterJson = require("./outputJsons/gitLogsMaster.json");
var fs = require('fs');

//Sorting array Weekwise
masterJson.sort(function(a,b){
  var dateA=new Date(a.date);
  var dateB=new Date(b.date);
  if(dateA>dateB){
    return -1;
  }
  return 1;
});

//Data structute of data for the graph
function dailyCommit(day,noCommit){
  this.day=day;
  this.noCommit=noCommit;
};

function weeklyCommit(weekNo,noCommits, year, dailyCommit){
  this.weekNo=weekNo;
  this.noCommits=noCommits;
  this.year=year;
  this.dailyCommitList=dailyCommitList;
};

//Initialinsing the variables
var weeklyCommitsList=[];
var dailyCommitList=[];
resetDailyCommit();
var date = new Date(masterJson[0].date);
var week=new weeklyCommit(getWeek(date),1,date.getFullYear());;
var dayCommit=new dailyCommit(date.getDay(),1);

//Looping the array to create the data Structure
for(var i=1;i<masterJson.length;i++){
  var date = new Date(masterJson[i].date);
  var weekNo=getWeek(date);
  if(weekNo!==week.weekNo){
    if(weeklyCommitsList.length==52)
    {
      break;
    }
    dailyCommitList[dayCommit.day].noCommit=dayCommit.noCommit;
    week.dailyCommitList=dailyCommitList;
    weeklyCommitsList.push(week);
    week = new weeklyCommit(weekNo,1,date.getFullYear());
    dayCommit=new dailyCommit(date.getDay(),1);
    resetDailyCommit();
  }
  else{
    week.noCommits+=1;
    if(dayCommit.day!==date.getDay()){
      dailyCommitList[dayCommit.day].noCommit=dayCommit.noCommit;
      dayCommit=new dailyCommit(date.getDay(),1);
    }
    else{
      dayCommit.noCommit+=1;
    }
  }
}

//writing the json to file
var gdpINDJson = JSON.stringify(weeklyCommitsList, null, 4);
fs.writeFile( "./inputLogs/commitsJson.json", gdpINDJson, function(err) {
  if(err) {
    return console.log(err+" :error writing to JSON file");
  }
});

//Function to get week no of the day in year
function getWeek(date) {
  var onejan = new Date(date.getFullYear(),0,1);
  return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
}

//Data structure for the initail weekday data
function resetDailyCommit(){
  dailyCommitList=[
    {
      "day": "Sunday",
      "noCommit": 0
    },
    {
      "day": "Monday",
      "noCommit": 0
    },
    {
      "day": "Tuesday",
      "noCommit": 0
    },
    {
      "day": "Wednesday",
      "noCommit": 0
    },
    {
      "day": "Thursday",
      "noCommit": 0
    },
    {
      "day": "Friday",
      "noCommit": 0
    },
    {
      "day": "Saturday",
      "noCommit": 0
    }];
  }

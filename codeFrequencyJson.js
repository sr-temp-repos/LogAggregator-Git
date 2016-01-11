/*******************************************************************/
/*Authors : Sridharan M and Pranay Gandhi************************/
/*Created Date : 07-01-2015*****************************************/
/*This script converts the raw git log data into structured json file*************/

//Function which returns the week number for a day. Week will start from monday
Date.prototype.getWeek = function() {
  var firstJan = new Date(this.getFullYear(),0,1);
  var n = firstJan.getDay();
  var firstSundayofYear = new Date(firstJan);
  firstSundayofYear.setDate((firstJan).getDate()+(7-n));
  return Math.ceil((((this - firstSundayofYear) / 86400000)/7));
}

function d3DataGen (paramWeekWiseObj) {
  var transformedArray  = [];
  for(year in paramWeekWiseObj){
    for(week in paramWeekWiseObj[year]){
      transformedArray.push(paramWeekWiseObj[year][week]);
    }
  }
  return transformedArray;
}
var masterGitLogJson= require("./outputJsons/gitLogsMaster.json");
var weekWiseStatsObj = {};
masterGitLogJson.map(function(gitLogObj){
  var currObjDate;
  var currObjYear;
  var currObjWeek;
  if(gitLogObj.type == "Commit") {
    currObjDate = new Date(gitLogObj.date);
    currObjWeek = currObjDate.getWeek();
    currObjYear = currObjDate.getFullYear();
    if (weekWiseStatsObj[currObjYear] === undefined)
      weekWiseStatsObj[currObjYear] = {};
      if(currObjWeek in weekWiseStatsObj[currObjYear]) {
        weekWiseStatsObj[currObjYear][currObjWeek].insertions += parseInt(gitLogObj.insertions);
        weekWiseStatsObj[currObjYear][currObjWeek].deletions -= parseInt(gitLogObj.deletions);
      }
      else {
        //This week has traversed for the first time in this year
        weekWiseStatsObj[currObjYear][currObjWeek] = {};
        weekWiseStatsObj[currObjYear][currObjWeek].insertions = parseInt(gitLogObj.insertions);
        weekWiseStatsObj[currObjYear][currObjWeek].deletions = parseInt(gitLogObj.deletions)*-1;
        weekWiseStatsObj[currObjYear][currObjWeek].weekNum = currObjWeek;
        weekWiseStatsObj[currObjYear][currObjWeek].date = currObjYear;
        if(currObjWeek) {
          var day = currObjDate.getDay();
          week_sunday = new Date(currObjDate);
          week_sunday.setDate(week_sunday.getDate()-day);//Generates the date of the sunday of the current object date week
          weekWiseStatsObj[currObjYear][currObjWeek].weekStartDate = week_sunday;
        }
        else {
          weekWiseStatsObj[currObjYear][currObjWeek].weekStartDate = new Date('1/1/'+currObjYear.toString());
        }

      }
  }
});
weekWiseStatsObj = d3DataGen(weekWiseStatsObj);
// console.log(weekWiseStatsObj);
fs = require('fs');
fs.writeFile('outputJsons/codeFrequency.json', JSON.stringify(weekWiseStatsObj), function (err) {
  if (err) return console.log(err);
  console.log("Data has been written in the file");
});

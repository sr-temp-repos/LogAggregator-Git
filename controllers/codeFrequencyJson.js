/*******************************************************************/
/*Authors : Sridharan M and Pranay Gandhi************************/
/*Created Date : 07-01-2015*****************************************/
/*This script converts the raw git log data into structured json file*************/

//Function which returns the week number for a day. Week will start from monday
/**
 * Get the ISO week date week number
 */
var fs = require('fs');
Date.prototype.getWeek = function () {
    // Create a copy of this date object
    var target  = new Date(this.valueOf());

    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr   = (this.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // xwith the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);

    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();

    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

/**
* Get the ISO week date year number
*/
Date.prototype.getWeekYear = function ()
{
    // Create a new date object for the thursday of this week
    var target  = new Date(this.valueOf());
    target.setDate(target.getDate() - ((this.getDay() + 6) % 7) + 3);

    return target.getFullYear();
}

function d3DataGen (paramWeekWiseObj) {
  var transformedArray  = {};
  for(year in paramWeekWiseObj){
    if (transformedArray[year] === undefined) {
      transformedArray[year] = [];
    }
      for(week in paramWeekWiseObj[year]){
        transformedArray[year].push(paramWeekWiseObj[year][week]);
      }

  }
  return transformedArray;
}
var masterGitLogJson=  fs.readFileSync("../data/gitLogsMaster.json");
masterGitLogJson = JSON.parse(masterGitLogJson);
// console.log(masterGitLogJson);
var weekWiseStatsObj = {};
masterGitLogJson.map(function(gitLogObj){
  var currObjDate;
  var currObjYear;
  var currObjWeek;
  if(gitLogObj.type == "Commit") {
    currObjDate = new Date(gitLogObj.date);
    currObjWeek = currObjDate.getWeek();
    currObjYear = currObjDate.getWeekYear();

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
        // weekWiseStatsObj[currObjYear][currObjWeek].date = currObjYear;

          var day = currObjDate.getDay();
          week_sunday = new Date(currObjDate);
          week_sunday.setDate(week_sunday.getDate()-day);//Generates the date of the sunday of the current object date week
          weekWiseStatsObj[currObjYear][currObjWeek].weekStartDate = week_sunday;


      }
  }
});
console.log(weekWiseStatsObj);
weekWiseStatsObj = d3DataGen(weekWiseStatsObj);


fs.writeFile('../data/codeFrequency.json', JSON.stringify(weekWiseStatsObj, null, '\t'), function (err) {
  if (err) return console.log(err);
  console.log("Data has been written in the file");
});

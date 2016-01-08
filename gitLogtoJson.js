/*******************************************************************/
/*Authors : Assohlic Chutiya Sridharan M and Pranay Gandhi************************/
/*Created Date : 07-01-2015*****************************************/
/*This script converts the raw git log data into structured json file*************/

/*Import of necessary API*/
var fs = require("fs");

/*main function which processes the file in the desired manner*/
function gitLogFileProcessor() {
    var gitLogsMasterJson = [];
    var startUnitFlag = 0; //Flag to set for start of unit
    var fileName = "inputLogs/gitLogFile2";
    var unitIndex = 0; //Index for gitLogsMasterJson array

    /*Split file into lines*/
    try {
      gitRawData = fs.readFileSync(fileName).toString().split('\n');
    }catch(e){
      console.log(e);
      process.exit(1);
    }
    gitRawData.map(function(line) {
        var lineExtractions;

        if ((lineExtractions = line.match(/^commit/))) { //when the line is the first of its unit
            if (startUnitFlag !== 0) {
                unitIndex++;
                gitLogsMasterJson[unitIndex] = {};
            } else {
                //when we encountered the first commit
                startUnitFlag = 1;
                gitLogsMasterJson[unitIndex] = {};
            }
        } else
        if ((lineExtractions = line.match(/^Author:\s+(.*)<(.*)>/))) { //Fetching line with Author data
            gitLogsMasterJson[unitIndex].authorName = lineExtractions[1];
            gitLogsMasterJson[unitIndex].authorEmail = lineExtractions[2];
        } else
        if ((lineExtractions = line.match(/^Merge/))) { //Checking the commit is a Merge
            gitLogsMasterJson[unitIndex].type = "Merge";
        } else
        if ((lineExtractions = line.match(/^Date:\s+(.*)/))) { //Fetching line with Date
            gitLogsMasterJson[unitIndex].date = lineExtractions[1];
        } else {
            /*Commit with both insertions and deletions*/
            if ((lineExtractions = line.match(/ (\d+) files? changed, (\d+) insertions?\(\+\), (\d+) deletions?\(\-\)/))) {
                gitLogsMasterJson[unitIndex].fileChanged = lineExtractions[1];
                gitLogsMasterJson[unitIndex].insertions = lineExtractions[2];
                gitLogsMasterJson[unitIndex].deletions = lineExtractions[3];
                gitLogsMasterJson[unitIndex].type = "Commit";
            }
            /*Commit with only insertions*/
            else if ((lineExtractions = line.match(/ (\d+) files? changed, (\d+) insertions?\(\+\)$/))) {
                gitLogsMasterJson[unitIndex].fileChanged = lineExtractions[1];
                gitLogsMasterJson[unitIndex].insertions = lineExtractions[2];
                gitLogsMasterJson[unitIndex].deletions = "0";
                gitLogsMasterJson[unitIndex].type = "Commit";
            }
            /*Commit with only deletions*/
            else if ((lineExtractions = line.match(/ (\d+) files? changed, (\d+) deletions?\(\-\)$/))) {
                gitLogsMasterJson[unitIndex].fileChanged = lineExtractions[1];
                gitLogsMasterJson[unitIndex].deletions = lineExtractions[2];
                gitLogsMasterJson[unitIndex].insertions = "0";
                gitLogsMasterJson[unitIndex].type = "Commit";
            }
        }
    });
    /*Writing the array of objects to JSON*/
    fs.writeFile('outputJsons/gitLogsMaster.json', JSON.stringify(gitLogsMasterJson, null, '\t'), function(err){
      if(err)
        throw err;
      console.log("Json file is created successfully");
    });

} /*end gitLogFileProcessor*/

gitLogFileProcessor();

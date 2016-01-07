
/*Function to */
function logFileProcessor() {
  /*Import nessary API*/
  var fs = require("fs");

  var gitLogsMasterJson = [];
  // var startUnitFlag = 0;
  var unitObj = {};
  var startUnitFlag = 0;
  var fileN = "inputLogs/gitLogFile";
  var unitIndex = 0;
  /*Read each line*/
  confData = fs.readFileSync(fileN).toString().split('\n');
  // console.log(confData);
  confData.map(function(line) {
    var temp ;
    // console.log("____LINE_____");
    // console.log(line);
    if((temp = line.match(/^commit/))){ //when the line is the first of its unit
      if(startUnitFlag !== 0){
        // console.log("First If");
        // console.log("Array before push: ");
        // console.log(gitLogsMasterJson);
        // console.log("Not first line : ");
        // console.log(unitObj);

        // gitLogsMasterJson[gitLogsMasterJson.length] = unitObj;
        // console.log("Array after push: ");
        // console.log(gitLogsMasterJson);
        unitIndex++;
        gitLogsMasterJson[unitIndex] = {};
      }
      else {
        // console.log("first else");
        // console.log("First Line"+line);
        startUnitFlag = 1;
        gitLogsMasterJson[unitIndex] = {};
      }
    }
    else
      if((temp = line.match(/^Author:\s+(.*)<(.*)>/))) {
        // console.log("second If");
        gitLogsMasterJson[unitIndex].authorName = temp[1];
        gitLogsMasterJson[unitIndex].authorEmail = temp[2];
      }
      else
        if((temp = line.match(/^Merge/))) {
          // console.log("Third If");
          gitLogsMasterJson[unitIndex].type = "Merge";
        }
        else
          if((temp = line.match(/^Date:\s+(.*)/))) {
            // console.log("fourth If");
            gitLogsMasterJson[unitIndex].date = temp[1];
          }
          else
            if((temp = line.match(/ (\d+) files changed, (\d+) insertions\(\+\), (\d+) deletions\(\-\)/))) {
              // console.log("fifth if");
              gitLogsMasterJson[unitIndex].fileChanged = temp[1];
              gitLogsMasterJson[unitIndex].insertions = temp[2];
              gitLogsMasterJson[unitIndex].deletions = temp[3];
              gitLogsMasterJson[unitIndex].type = "Commit";
            }

        // console.log("out");
  });

// console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffff");
fs.writeFile('outputJsons/gitLogsMaster.json', JSON.stringify(gitLogsMasterJson));
}

logFileProcessor();

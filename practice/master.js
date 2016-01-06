
/*Function to */
function logFileProcessor() {
  /*Import nessary API*/
  var fs = require("fs");
  var readline = require("readline");

  var fileN = "gitLogFile2";

  var lookup = fs.createReadStream(fileN);
  var rlLookup = readline.createInterface({
      input: lookup
  });

  var gitLogsMasterJson = [];
  // var startUnitFlag = 0;
  var unitObj = {};
  var startUnitFlag = 0;
  /*Read each line*/
  rlLookup.on('line', function(line) {
    var temp ;
    if((temp = line.match(/^commit/))){ //when the line is the first of its unit
      if(startUnitFlag !== 0){
        console.log("Array before push: ");
        console.log(gitLogsMasterJson);
        console.log("Not first line : ");
        console.log(unitObj);

        gitLogsMasterJson.push(unitObj);
        console.log("Array after push: ");
        console.log(gitLogsMasterJson);
      }
      else {
          console.log("First Line"+line);
          startUnitFlag = 1;
      }
    }
    else
      if((temp = line.match(/^Author:\s+(.*)<(.*)>/))) {
        unitObj.authorName = temp[1];
        unitObj.authorEmail = temp[2];
      }
      else
        if((temp = line.match(/^Merge/)))
          unitObj.type = "Merge";
        else
          if((temp = line.match(/^Date:\s+(.*)/)))
            unitObj.date = temp[1];
          else
            if((temp = line.match(/(\d+) file changed, (\d+) insertion\(\+\), (\d+) deletion\(\-\)/))) {
              unitObj.fileChanged = temp[1];
              unitObj.insertions = temp[2];
              unitObj.deletions = temp[3];
              unitObj.type = "Commit";
            }
  });
  rlLookup.on('close', function(){
    console.log(gitLogsMasterJson);
  });

}

logFileProcessor();

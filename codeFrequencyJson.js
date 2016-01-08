/*******************************************************************/
/*Authors : Assohlic Chutiya Sridharan M and Pranay Gandhi************************/
/*Created Date : 07-01-2015*****************************************/
/*This script converts the raw git log data into structured json file*************/

/*Import of necessary API*/
var fs = require("fs");

/*main function which processes the file in the desired manner*/
function codeFrequencyJson() {

var gitRawData = JSON.parse(fs.readFileSync('outputJsons/gitLogsMaster.json'));

console.log(gitRawData);

} /*end gitLogFileProcessor*/

codeFrequencyJson();

/*******************************************************************/
/*Authors : Aayush Aditya and Arul************************/
/*Created Date : 10-01-2015*****************************************/
/*This script converts the master json to find the per months commits done*************/

/*Import of necessary API*/
var fs = require('fs');
var path = require('path');
var jsonObj = require("./outputJsons/gitLogsMaster.json");
var unique = {};var distinct = [];
var json = [];
var count = 0;

//for iterating through master json
for (var j = 0; j < jsonObj.length; j++) {

  if( typeof(unique[jsonObj[j]["authorName"]]) == "undefined"){
    distinct.push(jsonObj[j]["authorName"]);
    count += 1;
  }
  unique[jsonObj[j]["authorName"]] = 0;
}
console.log(distinct.length);
// console.log(unique);
// console.log(count);

for(var i = 0; i < distinct.length - 1; i++)
{
  var commitValue = 0;
  for (var k = 0; k < jsonObj.length; k++) {
    if ((jsonObj[k]["authorName"] == distinct[i])  &&  (jsonObj[k]["type"] == "Commit")) {
      commitValue = commitValue + 1;
    }
  }
  var tmp = {};
  tmp["author name"]=distinct[i];
  tmp["no_Of_Commits"]= commitValue;
  commitValue = 0;
  // Adds the above object
  json.push(tmp);
}
json.sort(function(a,b){/*for sorting the json array created*/
  if((a.no_Of_Commits) > (b.no_Of_Commits)){
    return -1;
  }
  return 1;
});

var json100 = json.slice(0, 100);/*slice method used to get the top hundred data*/
console.log(json100);
var FileLocation = path.join(__dirname, 'outputJsons',"Top100AuthorsList1.json");/*Setting the path location to write*/
fs.writeFile(FileLocation,JSON.stringify(json100,null,'\t'), 'utf8', function(err) {/*Writing the array of objects to JSON*/
  console.log("File  was  created successfully");
});

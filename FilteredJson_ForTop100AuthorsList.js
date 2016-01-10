var fs = require('fs');
var path = require('path');
var jsonObj = require("./outputJsons/gitLogsMaster.json");
var unique = {};
var distinct = [];
var json = [];
var count = 0;

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
  // Add object to list
  json.push(tmp);
}
json.sort(function(a,b){
  if((a.no_Of_Commits) > (b.no_Of_Commits)){
    return -1;
  }
  return 1;
});

var json100 = json.slice(0, 100);
console.log(json100);
var FileLocation = path.join(__dirname, 'outputJsons',"Top100AuthorsList.json");
fs.writeFile(FileLocation,JSON.stringify(json100,null,'\t'), 'utf8', function(err) {
  console.log("File  was  created successfully");
});

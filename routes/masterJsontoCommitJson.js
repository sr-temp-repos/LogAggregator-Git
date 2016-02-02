//Author: Abhinav Ashesh and Damodar//
//Date: 15-jan-2016//

var fs = require('fs');
//function to get the week number of a particular year starting from first sunday
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var n = onejan.getDay();
    var sunday = new Date(onejan);
    sunday.setDate((onejan).getDate()+(7-n));
    return Math.ceil((((this - sunday) / 86400000)/7));
}

//function to convert the json file to d3 objects
function d3DataGen (paramWeekWiseObj)
{
  var transformedArray  = [];
  //var hold_object = {};

  for(year in paramWeekWiseObj)
  {
    var temp_obj={};
    for(week in paramWeekWiseObj[year])
    {
      temp_obj={};
      temp_obj["year"]=parseInt(year);
      temp_obj["weekNo"]=parseInt(week);
      temp_obj["noCommits"]=0;
      temp_obj["dailyCommitList"]=[
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
        }
      ];
      //var temp_day_obj=[];
      for(day in paramWeekWiseObj[year][week])
      {
        temp_obj["noCommits"]+=paramWeekWiseObj[year][week][day];
        for(var i=0;i<temp_obj["dailyCommitList"].length;i++)
        {
          if(temp_obj["dailyCommitList"][i]["day"]===day)
          {
            temp_obj["dailyCommitList"][i]["noCommit"]=paramWeekWiseObj[year][week][day];
          }
        }

      }
      transformedArray.push(temp_obj);
    }

  }
  return transformedArray;
}




exports.convert_json_type = function(masterJson){

   //reading the file syncronously
   //var jsonContent = fs.readFileSync('./outputJsons/gitLogsMaster.json');
   //var masterJson = JSON.parse(jsonContent);
   var length_of_data = masterJson.length;
   console.log(masterJson.length);
   var day_details=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   var top_object={};
   //loop for reading each and every component using json
  for(var i=0; i<length_of_data;i++)
  {

    //if(masterJson[i].type=="Commit")      //filtering only data that is of type commits
    //{
      var current_date = new Date(masterJson[i].commitDate);
      var current_year= current_date.getFullYear();
      //console.log(current_date+" "+current_year);
      var current_week = current_date.getWeek();
      var current_day=current_date.getDay();
      if(top_object[current_year]===undefined)        //if year is not defined
      {
        top_object[current_year]={};
        if(top_object[current_year][current_week]===undefined)      // if current week is not defined
         {
          top_object[current_year][current_week]={};
          if(top_object[current_year][current_week][day_details[current_day]]===undefined)  //if current day is not defined
          {
            top_object[current_year][current_week][day_details[current_day]]=1;
          }
        }
      }
      else
      {
        if(top_object[current_year][current_week]===undefined)          //if year is defined and current week is not defined
        {
          top_object[current_year][current_week]={};
          if(top_object[current_year][current_week][day_details[current_day]]===undefined)      //if current day is not defined
          {
            top_object[current_year][current_week][day_details[current_day]]=1;
          }
        }
        else
        {
          if(top_object[current_year][current_week][day_details[current_day]]===undefined)       //if current week is defined but day is not
          {
            top_object[current_year][current_week][day_details[current_day]]=1;
          }
          else                                                                          //if everything is defined
          {
            top_object[current_year][current_week][day_details[current_day]]+=1;
          }
        }
      }
    //}
  }

  //console.log(top_object);
  var json=d3DataGen(top_object);
  //console.log(json);
  return json;
  // fs.writeFile( "data/commitsJson.json", JSON.stringify(json), function(err) {
  //   if(err) {
  //     return console.log(err+" :error writing to JSON file");
  //   }
  // });
}



exports.sayhello = function(){
        console.log("we are calling this module from the outside");
  }

console.log("Hey i am doing good");

Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
var n = onejan.getDay();
// while((sunday).getDay() != 0)
// {
//   sunday = (sunday).getDay();
// }
var sunday = new Date(onejan);
sunday.setDate((onejan).getDate()+(7-n));
//console.log(sunday+":"+this +"/"+Math.ceil(((((this - sunday) / 86400000))/7)) +"/"+(this - sunday));
return Math.ceil((((this - sunday) / 86400000)/7));
}

var masterjson= require("./gitLogsMaster.json");
//console.log(masterjson[0]["date"]);

// for(var j=0;j<masterjson.length;j++)
// {
//   var dateTime = new Date("Sat Dec 26 20:54:01 2015 -0800");
//   var dateTime2 = new Date("Sat Dec 27 20:54:01 2015 -0800");
//
//   console.log(dateTime>dateTime2);
// }

function compare(a,b) {
  var dateTime1 = new Date(a["date"]);
  var dateTime2 = new Date(b["date"]);
  if (dateTime1 < dateTime2)
    return -1;
  else if (dateTime1 > dateTime2)
    return 1;
  else
    return 0;
}

masterjson.sort(compare);

//console.log(masterjson);

var json=[];
var flag=0;
var obj={};
var obj1={};
var day_details= ["Sunday","Monday","Tuesday","Wednusday","Thrusday","Friday","Saturday"];
for(var j=0;j<masterjson.length;j++)
{

  var date_new = new Date(masterjson[j]["date"]);
  var week_no= date_new.getWeek();
  var year = date_new.getFullYear();
  var day = date_new.getDay();
  //console.log("Year_number:"+ year +"Week_Number :"+week_no);
  //console.log(week_no + " "+ flag1);

    //console.log(week_no);
      //flag1=1;
      if(obj["week_no"]!==week_no || j==masterjson.length-1)
      {
        if(j==masterjson.length-1)
        {
            obj["weekly_commits"] +=1;
        }
        if(flag==1)
        {
          obj1[obj["day"]] = obj["daily_commits"];
          obj["new_obj"]=obj1;
          json.push(obj);
        }

        flag=1;
        obj={};

        obj["week_no"]=week_no;
        obj["weekly_commits"]=1;
        obj["day"]=day_details[day];
        var week_sunday = new Date(date_new);
        week_sunday.setDate(week_sunday.getDate()-day);
        obj["year"]=year;
        obj["mon"]=week_sunday.getMonth();
        obj["date"]= week_sunday.getDate();
        obj["daily_commits"] = 1;

        //console.log(obj1);
        obj1={};
        //console.log(week_sunday + "/ " + date_new + "/ " +masterjson[j]["date"] +"/ "+ week_no + " /" + day);
      }
      else {
        obj["weekly_commits"] +=1;
        //console.log(obj["day"] +":"+day_details[day]);
        if(obj["day"] == day_details[day])
        {
          obj["daily_commits"] += 1;
        }
        else
        {
          obj1[obj["day"]] = obj["daily_commits"];
          obj["day"]=day_details[day];
          obj["daily_commits"] = 1;
        }
      }






  //console.log(date_new+":"+n);
//   if(n==0)
//   {
//     if(flag==0)
//     {
//       json.push(obj);
//       obj = {};
//       flag=1;
//       obj["date_sun"]=date_new;
//       obj["commit"] = 1;
//     }
//     else if(flag == 1)
//     {
//
//         //obj["date_sun"]=date_new;
//         obj["commit"] += 1;
//     }
//   }
//   else {
//     {
//        obj["commit"] += 1;
//        if(n==6)
//        {
//          flag=0;
//          //console.log(obj);
//        }
//     }
//   }
 }

console.log(json);

fs = require('fs');
fs.writeFile('map_json.json', JSON.stringify(json), function (err) {
  if (err) return console.log(err);

});

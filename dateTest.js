Date.prototype.getWeek = function() {
  var firstJan = new Date(this.getFullYear(),0,1);
  var n = firstJan.getDay();
  var firstSundayofYear = new Date(firstJan);
  firstSundayofYear.setDate((firstJan).getDate()+(7-n));
  return Math.ceil((((this - firstSundayofYear) / 86400000)/7));
}

var d = new Date("2015-12-31");
// console.log(d.getFullYear());
// console.log(d.getMonth());
// console.log(d.getDay());
// console.log(d.getWeek());


 currentLogDate = new Date("2015-12-31");
 var day = currentLogDate.getDay();
 week_sunday = new Date(currentLogDate);
 week_sunday.setDate(week_sunday.getDate()-day);
console.log(week_sunday);

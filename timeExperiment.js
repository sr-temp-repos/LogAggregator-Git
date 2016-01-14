var moment = require('moment');
console.log("*******************************");
var endDate = moment('Tue Jan 5 23:46:05 2016 -0500', 'ddd mmm D HH:mm:ss');
var startDate = moment('Sat Dec 26 20:54:01 2015 -0500', 'ddd mmm D HH:mm:ss');
console.log(endDate);
var secondsDiff = endDate.diff(startDate, 'seconds');
console.log(secondsDiff);

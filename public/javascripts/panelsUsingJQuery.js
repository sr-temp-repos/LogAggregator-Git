// /*******************************************************************/
// /*Authors : Aayush Aditya and Arul************************/
// /*Created Date : 12-01-2015*****************************************/

//self invoking anonymous function
(function(){
  var aData;

  //function getAuthor(nor,divClassName) {

$.ajax({
  url: "/Top100AuthorsList.json",
  dataType: 'json',
  async: false,
  success: function(jd) {
aData=jd;
  }
});
// for loop iterating through each Authors
for(var i = 0; i < aData.length ; i++)
{
  //divClassName: variable for mapping to respective class
var divClassName = 'author' + (i + 1);
getAuthor(i,divClassName);


}
function getAuthor(nor,divClassName) {
  var aut = (aData[nor]["AuthorName"]).toUpperCase();//aut: variable to get the author's name
  strCommit = aData[nor]["noOfCommits"];//strCommit: variable to get the author's no. of Commits
  var autCommit = parseInt(strCommit) ;//autCommit: variable to get the author's name
  var d = new Date();// javascript date function : Date()
  var str = $('#year_select option:selected').text();
  var currentDate =  d.getDate()+ "/" +(d.getMonth()+1) + "/" + (d.getFullYear())  //d.getFullYear() ;//currentDate: returns the date in dd/mm/yyyy format
// adding html elements and storing in a variable div
    var div = $('<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3>#'+ (nor+1) +'.&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ aut + '</h3> </div><div class="panel-body ' + divClassName + '  "><p>'+"Hi, "+ aut +'<br><br>'+"You made a total of"+ '&nbsp&nbsp<b><u>'+ autCommit + '</b>&nbsp&nbsp<b>'+ "commits in '' nodejs/node '' Repository from" + '&nbsp&nbsp'  + "15/02/2009 –  "+ currentDate +'</u>.</b></p><br><p>' + "Graphs for Commits by"+ '&nbsp&nbsp' + aut + '&nbsp' + "in the year  :" + '&nbsp' + str + '</p></div></div></div>');
    $('.col-sm-12').append(div);
}
// console.log(aData.length);
})();

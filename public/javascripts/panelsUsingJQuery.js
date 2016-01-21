// /*******************************************************************/
// /*Authors : Aayush Aditya and Arul************************/
// /*Created Date : 12-01-2015*****************************************/

//self invoking anonymous function
(function(){

  function getAuthor(nor,divClassName) {

$.ajax({
  url: "/Top100AuthorsList.json",
  dataType: 'json',
  async: false,
  success: function(jd) {

  var aut = (jd[nor]["AuthorName"]).toUpperCase();//aut: variable to get the author's name
  strCommit = jd[nor]["noOfCommits"];//strCommit: variable to get the author's no. of Commits
  var autCommit = parseInt(strCommit) ;//autCommit: variable to get the author's name
  var d = new Date();// javascript date function : Date()
  var str = $('#year_select option:selected').text();
  console.log(str);
  var currentDate =  d.getDate()+ "/" +(d.getMonth()+1) + "/" + (d.getFullYear())  //d.getFullYear() ;//currentDate: returns the date in dd/mm/yyyy format
// adding html elements and storing in a variable div
    var div = $('<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3>#'+ (nor+1) +'.&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ aut + '</h3> </div><div class="panel-body ' + divClassName + '  "><p>'+"Hi, "+ aut +'<br><br>'+"You made a total of"+ '&nbsp&nbsp<b><u>'+ autCommit + '</b>&nbsp&nbsp<b>'+ "commits in '' nodejs/node '' Repository from" + '&nbsp&nbsp'  + "15/02/2009 –  "+ currentDate +'</u>.</b></p><br><p>' + "Graph Plotted for Commits by"+ '&nbsp&nbsp' + aut + '&nbsp' + "in the year  :" + '&nbsp' + str + '</p></div></div></div>');
    $('.col-sm-12').append(div);
  }
});


  }
// for loop iterating through each Authors
for(var i = 0; i < 100 ; i++)
{
  //divClassName: variable for mapping to respective class
var divClassName = 'author' + (i + 1);
getAuthor(i,divClassName);


}

})();

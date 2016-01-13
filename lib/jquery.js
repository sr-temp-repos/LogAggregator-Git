var arrAuthor = ["author1","author2","author3","author4"];

(function(){

jQuery.each(arrAuthor,function(i,val){
// (function(){


  $('.col-sm-12')
     .append('<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3>Log Aggregator</h3></div><div class="panel-body"><p> This is Panel Body </p></div></div></div>')


  $('.panel-body').addClass(val);
  console.log(val);


// })();

});

})();

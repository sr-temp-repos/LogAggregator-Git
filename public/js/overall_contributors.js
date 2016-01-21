//created By Aayush Aditya

$('#year_select').on('change',function(){
year_wise_plot();
plot_author_graph();
});

function year_wise_plot(){
  var margin1 = {top: 20, right: 20, bottom: 30, left: 50},
  width1 = 1000;
  height1 = 200;

  $('.overall svg').remove();

  // var xScale = d3.time.scale()
  //     .range([0, width1]);

  var xScale = d3.scale.linear()
            .range([0,width1]);

  var yScale = d3.scale.linear()
      .range([height1, 0]);

  var xAxis1 = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

  var yAxis1 = d3.svg.axis()
      .scale(yScale)
      .innerTickSize(-width1)
      .orient("left");

  var area = d3.svg.area()
      .x(function(d) { return xScale(d.month); })
      .y0(height1)
      .y1(function(d) { return yScale(d.noOfCommits); });

  var svg = d3.select(".overall").append("svg")
          .attr("width", width1 + margin1.left + margin1.right)
          .attr("height", height1 + margin1.top + margin1.bottom)
        .append("g")
          .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");


  d3.json("/jsonFileForOverallCommitsForContributorsGraph.json",function(error, data) {
    if (error) throw error;

    var str = $('#year_select option:selected').text();
   data = data.myFind({year:parseInt(str)});
   data.sort(function(a,b){
     if(a.month < b.month)
     {return -1;}
     if(a.month > b.month)
     {return 1;}
     return 0;
   });
   //console.log(data);
   //console.log(str);
    xScale.domain([0,d3.max(data, function(d) { return d.month;})]);
    yScale.domain([0, d3.max(data, function(d) { return d.noOfCommits; })]);
    //console.log(xScale(9) +":"+ yScale(120));
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(xAxis1);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis1)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -46)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number Of Commits");
  });
}

year_wise_plot()

Array.prototype.myFind = function(obj) {
  return this.filter(function(item) {
    for (var prop in obj)
    if (!(prop in item) || obj[prop] !== item[prop])
    return false;
    return true;
  });
};

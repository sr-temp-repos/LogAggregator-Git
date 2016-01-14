// /*******************************************************************/
// /*Authors : Aayush Aditya and Arul************************/
// /*Created Date : 10-01-2015*****************************************/

// function to plot the graph using d3js
function plot_graph(fileToBeLoaded,className){

var margin = {top: 40, right: 20, bottom: 60, left: 30},
    width = 495;
    height = 200;

var x = d3.scale.ordinal()
    .rangeRoundBands([10, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .innerTickSize(-width);
    // .tickFormat(d3.format(".20"));


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>no_Of_Commits:</strong> <span style='color:red'>" + d.no_Of_Commits + "</span>";
  })

var svg = d3.select(className).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   svg.call(tip);

d3.json(fileToBeLoaded,function(error, data) {
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.no_Of_Commits; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", "-.5em")
                       .attr("transform", function(d) {
                           return "rotate(-75)"
                           });



  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No Of Commits");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.no_Of_Commits); })
      .attr("height", function(d) { return height - y(d.no_Of_Commits); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});
function type(d) {
  d.no_Of_Commits = +d.no_Of_Commits;
  return d;
}
};



//looping for reading all the 100 files
for(var i=0;i<100;i++)
{
  // loads the jsons for each author to plot for Authors  data
  var fileToBeLoaded = "./outputJsons/jsonsAuthor/AuthorRank_" + (i+1) + ".json";//fileToBeLoaded: variable to load the files
  // searches for the class named author for svg selection
  var className =".author"+(i+1);//className: variable to search for class name
  plot_graph(fileToBeLoaded,className);
}

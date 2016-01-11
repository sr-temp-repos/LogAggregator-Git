var margin1 = {top: 40, right: 20, bottom: 60, left: 40},
    width1 = 1000;
    height1 = 200;

var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width1], .1);

var y1 = d3.scale.linear()
    .range([height1, 0]);

var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left")
    .tickFormat(d3.format(".20"));

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Mo_Of_Commits:</strong> <span style='color:red'>" + d.no_Of_Commits + "</span>";
  })

var svg = d3.select(".overall").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

svg.call(tip);

d3.json("./outputJsons/jsonFileForOverallCommitsForContributorsGraph.json",function(error, data) {
  //data.sort(function(a, b) { return b.no_Of_Commits - a.no_Of_Commits; });
  x1.domain(data.map(function(d) { return d.month; }));
  y1.domain([0, d3.max(data, function(d) { return d.no_Of_Commits; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis1)
      .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", ".15em")
                       .attr("transform", function(d) {
                           return "rotate(-65)"
                           });



  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No Of Commits");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1(d.month); })
      .attr("width", x1.rangeBand())
      .attr("y", function(d) { return y1(d.no_Of_Commits); })
      .attr("height", function(d) { return height - y1(d.no_Of_Commits); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function ty1pe(d) {
  d.no_Of_Commits = +d.no_Of_Commits;
  return d;
}

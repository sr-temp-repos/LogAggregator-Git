var margin = {top: 40, right: 20, bottom: 60, left: 60},
    width = 350;
    height = 200;

var x = d3.scale.ordinal()
    .rangeRoundBands([15, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".20"));

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>no_Of_Commits:</strong> <span style='color:red'>" + d.no_Of_Commits + "</span>";
  })

var svg2 = d3.select(".authors_div .samp2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.call(tip);

d3.json("./outputJsons/jsonsAuthor/AlexisCampailla.json",function(error, data) {
  //data.sort(function(a, b) { return b.no_Of_Commits - a.no_Of_Commits; });
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.no_Of_Commits; })]);

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", ".15em")
                       .attr("transform", function(d) {
                           return "rotate(-65)"
                           });



  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No Of Commits");

  svg2.selectAll(".bar")
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

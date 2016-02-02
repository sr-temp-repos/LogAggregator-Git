(function(){
  console.log("this will be called when the document is ready");
     $.get("/commitsData", function(jsonData) {
       console.log(jsonData);
        jsonData.sort(function(a,b){                                //sorting the data to find the min and maximum year.
          if(a.year > b.year) return -1;
          else if(a.year < b.year) return 1;
          return 0;
        });
        var max_year = jsonData[0].year;
        var min_year = jsonData[jsonData.length-1].year;
        console.log(jsonData +"min"+ min_year +"max" + max_year);
        for(var i=min_year;i<=max_year;i++)
        {
          $('#year_select').append($('<option>', {
            value: i,
            text: i
          }));
        }
        plot_the_graph(jsonData);
      }, "json")
      .done(function() {
      // passDataToPlotGraph();
      console.log(" success" );
      })
      .fail(function() {
        console.log("Fail");
      });
})();

$('#year_select').on('change',function(){
  console.log("this is called when the button is clicked");
  $.get("/commitsData", function(jsonData) {
    console.log(jsonData);
     plot_the_graph(jsonData);
   }, "json")
   .done(function() {
   // passDataToPlotGraph();
   console.log(" success" );
   })
   .fail(function() {
     console.log("Fail");
   });
});

function plot_the_graph(data)
{
  console.log(data);
  Array.prototype.myFind = function(obj) {
    return this.filter(function(item) {
      for (var prop in obj)
      if (!(prop in item) || obj[prop] !== item[prop])
      return false;
      return true;
    });
  };
  $('svg').remove();
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

  var dayData={};

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
  .range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .ticks(10);

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .innerTickSize(-width);

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>No of Commits:</strong> <span style='color:red'>" + d.noCommits + "</span>";
  })

  var svgBar = d3.select("#svgBar").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svgBar.call(tip);

  //d3.json("data/commitsJson.json", function(error, data) {


    var str=$('#year_select option:selected').text();
    data = data.myFind({year:parseInt(str)});
    dayData=data[data.length-1].dailyCommitList;
    weekNo=data[data.length-1].weekNo;
    x.domain(data.map(function(d) { return d.weekNo; }));
    y.domain([0, d3.max(data, function(d) { return d.noCommits; })]);

    svgBar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", 850)
    .attr("y",20)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Week Number");

    svgBar.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -16)
    .attr("dy", "-.71em")
    .style("text-anchor", "end")
    .text("Weekly No of Commits");

    var lastBar=  svgBar.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.weekNo); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.noCommits); })
    .attr("height", function(d) { return height - y(d.noCommits); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on("click", function(d){
      d3.selectAll('.bar').style("fill", "#f17f49");
      d3.select(this).style("fill", "#bd380f");
      dayData=d.dailyCommitList;
      changeLineData();
      d3.select("circle.y")
      .transition()
      .delay(100)
      .attr("transform","translate(" + (x(d.weekNo) +7)+ "," +235+ ")");
    });

    d3.select(lastBar[0][lastBar[0].length-1])
    .style("fill", "#bd380f");

    // append the circle at the intersection
    svgBar.append("circle")
    .attr("class", "y")
    .style("fill", "#bd380f")
    .attr("r", 2)
    .attr("transform","translate(" + (x(weekNo) +7)+ "," +235+ ")");


      var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var xScale = d3.scale.ordinal()
      .domain(weekdays)
      .rangePoints([0, width]);

      var ymax = ((30>d3.max(dayData,function(d){return d.noCommit}))?30:(d3.max(dayData,function(d){return d.noCommit;})));
      console.log(ymax);
      var yScale = d3.scale.linear()
      .domain([0, ymax])
      .range([height, 0]);

      var axisX = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickPadding(10);

      var axisY = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .innerTickSize(-width)
      .tickPadding(10);

      var line = d3.svg.line()
      .x(function(d) {return xScale(d.day); })
      .y(function(d) { return yScale(d.noCommit); });

      var svg = d3.select("#svg").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("align","center")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("align","center");

      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axisX)
      .append("text")
      .attr("x", 850)
      .attr("y",22)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Day");

      svg.append("g")
      .attr("class", "y axis")
      .call(axisY)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy",-36)
      .style("text-anchor", "end")
      .text("Day wise Number of Commits");

      var path= svg.append("path")
      .attr("class", "line")
      .attr("d", line(dayData));

      var cir = svg.selectAll('circle').data(dayData).enter().append('g');
      cir.append("circle")
      .attr('cx',function(d){return xScale(d.day);})
      .attr('cy',function(d){return yScale(d.noCommit);})
      .attr('r',4)
      .attr('fill','#1db34f')
      .style("stroke", "green");
      cir.append('text')
      .attr("class","text_disp")
      .attr("x",function(d){return xScale(d.day);}).attr("y",function(d){return yScale(d.noCommit)-10;}).text(function(d){return d.noCommit;});

      function changeLineData()
      {
        d3.select("path.line")
        .transition()
        .delay(100)
        .attr("d", line(dayData));

        var cir = svg.selectAll('circle').data(dayData);
        cir.transition().delay(200)
        .attr('cx',function(d){return xScale(d.day);})
        .attr('cy',function(d){return yScale(d.noCommit);})
        .attr('r',4)
        .attr('fill','#1db34f');

        svg.selectAll('.text_disp').data(dayData)
        .transition().delay(200)
        .attr("x",function(d){return xScale(d.day);})
        .attr("y",function(d){return yScale(d.noCommit)-10;})
        .text(function(d){return d.noCommit;});
      }
  //});
}

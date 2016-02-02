// Function to plot the graph
function plotCodeFrequencyGraph(data) {
    console.log("data");
    console.log(data);
    var margin = {
            top: 20,
            right: 90,
            bottom: 40,
            left: 100
        },
        width = 1130 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
    var xRage = d3.scale.ordinal()
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();


    var xAxis = d3.svg.axis()
        .scale(xRage)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .innerTickSize(-width);

    var area = d3.svg.area()
        .x(function(d) {
            return xRage(d.date);
        })
        .y0(function(d) {
            return y(d.y0);
        })
        .y1(function(d) {
            return y(d.y0 + d.y);
        });

    var stack = d3.layout.stack()
        .values(function(d) {
            return d.values;
        });
    d3.select("#chart").html("");
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    data.map(function(obj) {
        obj["insertions"] = parseFloat(obj["insertions"]);
        obj["deletions"] = parseFloat(obj["deletions"]);
        return obj;
    });
    color.domain(d3.keys(data[0]).filter(function(key) {
        return (key !== "weekStartDate" && key !== "weekNum" && key !== "date");
    }));


    var browsers = color.domain().map(function(name) {

        return {
            name: name,
            values: data.map(function(d) {
                var tempObj = {
                    date: d.weekNum,
                    y: d[name],
                    y0: 0
                };
                return tempObj;
            })
        };
    });

    y.domain([
        d3.min(browsers, function(c) {
            return d3.min(c.values, function(v) {
                return v.y;
            });
        }),
        d3.max(browsers, function(c) {
            return d3.max(c.values, function(v) {
                return v.y;
            });
        })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var xDom = data.map(function(d) {
        return d.weekNum;
    });
    xRage.domain(xDom);
    var vars = svg.selectAll(".vars")
        .data(browsers)
        .enter().append("g")
        .attr("class", "vars");

    vars.append("path")
        .attr("class", "area")
        .attr("d", function(d) {
            return area(d.values);
        })
        .attr("data-legend", function(d) {
            return d.name
        })
        .style("fill", function(d) {
            return color(d.name);
        });



    legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(50,30)")
        .style("font-size", "12px")
        .call(d3.legend)


}

(function(){
  $.get("/codeFrequencyData", function(data) {
    var jsonData = data;
    console.log(jsonData["2015"].length);
    console.log(jsonData["2016"].length);
    passDataToPlotGraph(jsonData);
}, "json")
.done(function() {
  // passDataToPlotGraph();
  console.log(" success" );
})
.fail(function() {
    console.log("Fail");
  });
})();

function passDataToPlotGraph(codeFreqGraphJsonData) {
  console.log("Code Freq GrapJson Data");
  //console.log(codeFreqGraphJsonData);
  //plotCodeFrequencyGraph(codeFreqGraphJsonData);
  var years = Object.keys(codeFreqGraphJsonData);//.sort(function(a, b) {
    //  return a - b
  //});
  console.log(codeFreqGraphJsonData.length);
  var yearsObj = [];
  years.map(function(year) {
      if (codeFreqGraphJsonData[year].length > 2) {
          yearsObj.push(year);
      }
  });
  $('.yearPagination').bootpag({
      total: yearsObj.length,
      page: 1,
      maxVisible: 2,
      pageObj: yearsObj
  }).on('page', function(event, num) {
      plotCodeFrequencyGraph(codeFreqGraphJsonData[yearsObj[num - 1]]);
      $(".content2").html("Page " + num); // or some ajax content loading...
  });
  console.log(years);
  console.log(codeFreqGraphJsonData[yearsObj[0]]);
  plotCodeFrequencyGraph(codeFreqGraphJsonData[yearsObj[0]]);

}

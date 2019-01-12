// Create data of pairs to visualize
var dataArray = [37.3,36.3,34.4,37.1,37.8,33.3,39.8];

// Create variable for the SVG
var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");

// Select, append to SVG, and add attributes to rectangles for bar chart
svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
          .attr("class", "bar")
          .attr("height", function(d, i) {return (d*10)})
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60) + 25})
          .attr("y", function(d, i) {return 400 - (d * 10)});

// Select, append to SVG, and add attributes to text
svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return (d/10).toFixed(2)})
           .attr("class", "text")
           .attr("x", function(d, i) {return (i * 60) + 30})
           .attr("y", function(d, i) {return 415 - (d * 10)});


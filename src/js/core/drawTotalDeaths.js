/********************************************************************************************\
 Description: Function to draw the header bar chart displaying total deaths for each year.
 /*******************************************************************************************/

function drawTotalDeaths(){

    var margin = {top: 10, right: 20, bottom: 10, left: 40},
        width = 910 - margin.left - margin.right,
        height = 120 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([1970, 2015])
        .range([0, width-margin.left-margin.right-40]);


    var y = d3.scaleLog()
        .domain([171, 43550])
        .range([5, height]);

    var totalCanvas = d3.select(".page-header").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + 0 + ")");

    d3.csv("data/totals.csv", function(error, data) {


        totalCanvas.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .style("fill", "#760d31")
            .attr("x", function(d) { return x(d.Year) + 90; })
            .attr("width", 10)
            .attr("y", function(d) { return 0; })
            .attr("height", function(d) { return y(d.Deaths); })
            .on("mouseover", function(d) {

                var coordinates = d3.mouse(this);   // Get the mouse positions to show tooltip at.
                // console.log(coordinates);
                var xPosition = coordinates[0];
                var yPosition = coordinates[1];

                d3.select("#tooltip4")
                    .style('left', xPosition + 'px')
                    .style('top', yPosition + 170 + 'px')
                    .text("Total Deaths: " + d.Deaths + " | Year: " + d.Year);
                // console.log(d3.select("#tooltip5").text);

                d3.select("#tooltip4").classed("hidden", false);
            })

            .on("mouseout", function() {
                d3.select("#tooltip4").classed("hidden", true);
            });


    });


}
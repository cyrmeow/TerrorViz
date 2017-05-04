/**
 * Created by A.C. on 4/29/17.
 */

var x = d3.scaleLinear()
    .domain([1970, 2015])
    .range([0, 800 - 55])
    .clamp(true);
var projection = d3.geoMercator()
    .center([3,40])
    .scale(100)
    .rotate([-10,0]);
function autoPlay() {
    var playTimer;
    $("#playPause").click(function () {
        if($("#playPause").hasClass("glyphicon-play")) {
            playTimer = setInterval(function(){autoAdvance()}, 1000);
            $("#playPause").removeClass("glyphicon-play");
            $("#playPause").addClass(("glyphicon-pause"));
        } else {
            console.log("play");
            clearInterval(playTimer);
            $("#playPause").removeClass("glyphicon-pause");
            $("#playPause").addClass("glyphicon-play");
        }
    })
}

function autoAdvance(){
    // var x = d3.select(".handle")
    //     .attr("cx");
    // console.log(x);
    var value = d3.select(".handle")
        .attr("cx");
    var year = parseInt(x.invert(value));
    // var year = x.invert(value);
    year = year + 1;
    if(year > 2015) {
        year = 1970;
    }
    change(year);
}

function change(h) {
    handle = d3.select(".handle");
    handle.attr("cx", x(h));
    var value = Math.floor(h);
    filteredArrayByYear.length=0;
    for(i=0;i<terror_year.length;i++){
        if(terror_year[i].iyear == value){
            filteredArrayByYear.push(terror_year[i]);
        }
    }



    myyear = value;
    drawPanel(false);


    d3.selectAll(".loc")
        .data(filteredArrayByYear)
        // .transition()
        // .duration(750)
        // .ease("linear")
        .attr("cx", function(d) {
            return projection([d.longitude, d.latitude])[0];
        })
        .attr("cy", function(d) {
            return projection([d.longitude, d.latitude])[1];
        })

}
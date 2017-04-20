

function drawBrush(projection,brushMargin, width, height){

    var svg6 = d3.select(".page-header").append("svg")
      .attr("width", width + brushMargin.left + brushMargin.right+300)
      .attr("height", 60);  

    var x = d3.scaleLinear()
      .domain([1970, 2015])
      .range([0, width-55])
      .clamp(true);

    // var brush = d3.brushX()
    //   .extent([[0,x.range()[0]], [140, x.range()[1]]])
    //   .on("brush", change);

    svg6.append("g")
      .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

    // svg6.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(140," + height  + ")")
    //   .call(d3.axisBottom(x)
    //     .tickValues(d3.range(1971, 2014, 3))
    //     .tickFormat(d3.format(".0f"))
    //     .tickSize(10)
    //     .tickPadding(12));

    // var slider = svg6.append("g")
    //   .attr("class", "slider")
    //   .append("circle")
    //   .style("fill","#E95151")
    //   .attr("transform", "translate(140," + height + ")")
    //     // .attr("cx", height)
    //   .attr("r", 8)
    //     .call(brush);

    // brush(slider);

    // var slider = d3.slider().min(0).max(10).ticks(10).showRange(true).value(6);
// Render the slider in the div
    var slider = svg6.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(140," + height + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            // .on("start drag", function() { hue(x.invert(d3.event.x)); })
            .on("start drag", function() { change(x.invert(d3.event.x));})
        );

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d ; });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    // slider.transition() // Gratuitous intro!
    //     .duration(750)
    //     .tween("hue", function() {
    //         var i = d3.interpolate(0, 70);
    //         return function(t) { hue(i(t)); };
    //     });

    function hue(h) {
        handle.attr("cx", x(h));
        svg6.style("background-color", d3.hsl(h, 0.8, 0.8));
    }
    function change(h) {
        handle.attr("cx", x(h));
        var value = Math.floor(h);
        // console.log(terror_year);
        filteredArrayByYear.length=0;
        for(i=0;i<terror_year.length;i++){
            if(terror_year[i].iyear == value){
                filteredArrayByYear.push(terror_year[i]);
            }
        }


        // handle.attr("cx", x(value));
        myyear = value;
        drawPanel(false);


        d3.selectAll(".loc")
          .data(filteredArrayByYear)
          .transition()
          .duration(750)
          // .ease("linear")
          .attr("cx", function(d) {
                       return projection([d.longitude, d.latitude])[0];
               })
               .attr("cy", function(d) {
                       return projection([d.longitude, d.latitude])[1];
               })

    }
    // function change() {
    //     var value = brush.extent()[0][0];
    //
    //     if (d3.event.sourceEvent) {
    //         value = x.invert(d3.mouse(this)[0]);
    //         brush.extent([value, value]);
    //     }
    //
    //     value = parseInt(value);
    //
    //
    //     filteredArrayByYear.length=0;
    //
    //
    //     for(i=0;i<terror_year.length;i++){
    //         if(terror_year[i].iyear == value){
    //             filteredArrayByYear.push(terror_year[i]);
    //         }
    //     }
    //
    //
    //     slider.attr("cx", x(value));
    //     myyear = value;
    //     drawPanel(false);
    //
    //
    //     d3.selectAll(".loc")
    //       .data(filteredArrayByYear)
    //       .transition()
    //       .duration(1500)
    //       .ease("linear")
    //       .attr("cx", function(d) {
    //                    return projection([d.longitude, d.latitude])[0];
    //            })
    //            .attr("cy", function(d) {
    //                    return projection([d.longitude, d.latitude])[1];
    //            })
    //
    //
    //
    // }

 


}


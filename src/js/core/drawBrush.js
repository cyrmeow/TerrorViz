

function drawBrush(projection,brushMargin, width, height){

    var svg6 = d3.select(".page-header").append("svg")
      .attr("width", width + brushMargin.left + brushMargin.right+300)
      .attr("height", 35);

    var x = d3.scaleLinear()
      .domain([1970, 2015])
      .range([0, width-55])
      .clamp(true);


    svg6.append("g")
      .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

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
        .attr("id", "handle")
        .attr("r", 9);

    function change(h) {
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
}


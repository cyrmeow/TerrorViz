/********************************************************************************************\
Description: Function to load raster data, draw the map and bind data points to it.
Author: Yiran Cao
/*******************************************************************************************/



function drawMap(margin,projection){
	

  var svg = d3.select(".margin-b-2").append("svg")
      .attr("width", 750)
      .attr("height", 450);
      
  var path = d3.geoPath()
      .projection(projection);

  var g = svg.append("g")
  		.attr("transform", "translate(" + (-50) + "," + (-50) + ")");

// load and display the World
  d3.json("data/world-110m2.json", function(error, dataset) {
      
      var countries = topojson.object(dataset, dataset.objects.countries).geometries;    
      d3.tsv("data/world-country-names.tsv",function(error,name){
          var names=name;   
          countries.forEach(function(d) { 
          d.name = names.filter(function(n) { return d.id == n.id; })[0].name; 
    });
        
             
      g.selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("class","country")
      .attr("d", path)
      .on("mouseover", function(d) {
          var coordinates = [0, 0];
          coordinates = d3.mouse(this);   // Get the mouse positions to show tooltip at.
          var xPosition = coordinates[0];
          var yPosition = coordinates[1];
           
          d3.select("#tooltip")
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .html("<b>"+d.name+"</b>");	
  
          d3.select("#tooltip").classed("hidden", false);
      })
      .on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);

      });

        
        
     d3.csv("data/attackData.csv",function(error,data){
            
           terror_year=data;             
            
            for(var i=0;i<terror_year.length;i++)
            {
                if(terror_year[i].iyear=="1970")
                {
                filteredArrayByYear[i]=terror_year[i];

                }
            }

            drawPanel(true);

            g.selectAll("circle")
               .data(filteredArrayByYear)
               .enter()
               .append("circle")
               .attr("class","loc")
               .attr("cx", function(d) {
                           return projection([d.longitude, d.latitude])[0];
                   })
                   .attr("cy", function(d) {
                           return projection([d.longitude, d.latitude])[1];
                   })
              .attr("r", 3)
              .style("fill", function(d){
                	if(d.weaptype1_txt == "Biological"){
                        // return "#ff9900";
                		return "blue";
                	}
                	else if(d.weaptype1_txt  == "Chemical"){
                        // return "#a6325a";
                		return "orange";
                	}
                	else if(d.weaptype1_txt  == "Explosives/Bombs/Dynamite"){
                		return "green";
                        // return "#48a7c2";
                	}
                	else if(d.weaptype1_txt  == "Fake Weapons"){
                        // return "#206fa1";
                		return "red";
                	}
                	else if(d.weaptype1_txt  == "Fire Arms"){
                		return "purple";
                        // return "#b1c914";
                	}
                	else if(d.weaptype1_txt  == "Incendiary"){
                        // return "#FFEFBF";
                		return "brown";
                	}
                	else if(d.weaptype1_txt  == "Melee"){
                		return "pink";
                	}
                	
                	else if(d.weaptype1_txt  == "Radiological"){
                		return "#728C00";
                	}
                	else {
                        // return "#C7F2E7";
                		return "grey";
                	}
                })
            .style("fill-opacity", "0.5")
            .style("stroke","black")
            .style("stroke-width","0.1")
            .on("mouseover", function(d) {
      
                var coordinates = [0, 0];
                coordinates = d3.mouse(this);   // Get the mouse positions to show tooltip at.
                  
                var xPosition = coordinates[0]+20;
                var yPosition = coordinates[1]+20;
                 
                      
                d3.select(this).attr("r",7);

                d3.select("#tooltip2")
                    .style('left', xPosition + 'px')
                    .style('top', yPosition + 'px')
                    .html("Location: "+d.city+"<br>Target: "+d.targsubtype1_txt+"<br>Attack Type: "+d.attacktype1_txt + "<br>Group: " + d.gname
                    	+ "<br>Weapon Type: " + d.weaptype1_txt );

                d3.select("#tooltip2").classed("hidden", false);
            })

            .on("mouseout", function() {
                d3.select("#tooltip2").classed("hidden", true);
                d3.select(this).attr("r",3);
            });
            
        });

    });
});

    // zoom and pan
    var zoom = d3.zoom()
        .on("zoom", zoomed);
    function zoomed() {
        g.attr("transform", d3.event.transform);
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")
            .attr("d", path.projection(projection));
    }
svg.call(zoom) ;

}
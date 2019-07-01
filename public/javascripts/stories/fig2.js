<script>
  var s=0;
  var data2 = [];
//console.clear()
var svg = d3.select("#chart2"),
    margin = {top: 40, right: 40, bottom: 160, left: 50},
    width =  +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div").attr("class", "toolTip");


var x0 = d3.scaleBand()
    .rangeRound([10, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);
    

//var y1 = d3.scaleBand()
  
var z = d3.scaleOrdinal()
    .range(["#98cccd", "#8a8ddd", "#7b6ddd", "#6b486b", "#a05d56", "#d0743c" ])
    .domain([0,200000]);


var z2 = d3.scaleOrdinal()
    .range(["#86ccff", "#0a8fff", "#3b0ccc", "#3b4000", "#a05ddd", "#d0743c" ]);    


//var stack=d3.stack().offset(offset);

 var stack = d3.stack().offset(d3.stackOffsetExpand);
 //var stack = d3.stack(); // default view is "zero" for the count display.
 console.log(stack);
  
d3.csv("housetype.csv", function(error, data) {
  if (error) throw error;
  
    data.forEach(function(d){
    d.value = +d.value;
  
  })


 



d3.csv("housetype.csv", function(error, data) {
  if (error) throw error;
  
  data.forEach(function(d){
    d.value = +d.value;
   
  })
});
  


/*d3.csv("housetype.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);*/







	//console.log("data", data);
  x0.domain(data.map(function(d) { return d.date; }));
  x1.domain(data.map(function(d) { return d.region; }))
    .rangeRound([0, x0.bandwidth()])
  	.padding(0.2);
  
  //z.domain(data.map(function(d) { return d.type; }))
  z.domain(data.map(function(d) { return d.type}))
  z2.domain(data.map(function(d) { return d.type}))
  //z.domain([0, d3.max(data, function(d) { return d.total; })]).nice();

  var keys = z.domain().reverse();
  var keys = z.domain()
  //var keys2 = z2.domain()
  




  var groupData = d3.nest()
    .key(function(d) { return  d.date + d.region})
  	.rollup(function(d, i){
      
     //console.log(typeof(d));  
      

      d2 = {date: d[0].date, region: d[0].region, type: d[0].type, value: d[0].value,
      date1: d[1].date, region1: d[1].region, type1: d[1].type, value1: d[1].value,
      date2: d[2].date, region2: d[2].region, type2: d[2].type, value2: d[2].value,
      date3: d[3].date, region3: d[3].region, type3: d[3].type, value3: d[3].value, 
      date4: d[4].date, region4: d[4].region, type4: d[4].type, value4: d[4].value,
      date5: d[5].date, region5: d[5].region, type5: d[5].type, value5: d[5].value,} 
      



     d.forEach(function(d){
        d2[d.type] = d.value
        console.log(d.type+'---'+d.value);
  
      })
      //console.log("rollup d", d, d2);
      return d2;

    
       //console.log('ffgfg'+sum1);
       //data2=[];
    })

    .entries(data)
    .map(function(d){ return d.value; });
     var stackData = stack.keys(keys)(groupData)
     var serie = g.selectAll(".serie")
     .data(stackData)
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); });
  
  serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
  		.attr("class", "serie-rect")
  		.attr("transform", function(d) { return "translate(" + x0(d.data.date) + ",0)"; })
      .attr("x", function(d) { return x1(d.data.region); })

      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x1.bandwidth())
  		.on("click", function(d, i){ console.log("serie-rect click d", i, d); })
      .on("mousemove",function(d){
        
        var Sum=parseInt(d3.sum([parseInt(d.data.value)
                      , parseInt(d.data.value1)
                      , parseInt(d.data.value2)
                      , parseInt(d.data.value3)
                      , parseInt(d.data.value4)
                      , parseInt(d.data.value5)]));
            tooltip
              .style("left", d3.event.pageX - 200 + "px")
              .style("top", d3.event.pageY - 200 + "px")
              .style("display", "inline-block")
              .style("left", d3.event.pageX - 200 + "px")
              .style("top", d3.event.pageY - 200 + "px")
              .style("display", "inline-block")
              //.text('Region:' + '  '+ d3.sum([parseInt(d.data.value),parseInt(d.data.value)]))
              .html(
                'Region:'+ "&emsp;&emsp;" +d.data.region 
                    +'<br/>' 
                    +'Year :'+ "&emsp;&emsp;" +d.data.date 
                    +'<br/>' 
                    + "</br>" + 
                      "</br>"  +
                     'Type' + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" 
                     + "Value" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + "Portion" + "</br>" 
                     + "</br>" + 
                                           
                   
                    d.data.type + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                    +"<font color=\"red\">" + d.data.value +  "</font>" + 
                    "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                    parseInt(parseInt(d.data.value) *100 / parseInt(Sum)) + "    %" +
                    "</br>" +


                   d.data.type1 + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                   +"<font color=\"red\">" + d.data.value1 +  "</font>" 
                   +"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                   parseInt(parseInt(d.data.value1) *100 / parseInt(Sum)) + "    %" +
                   "</br>" +
                    
                    d.data.type2 + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +"<font color=\"red\">" + d.data.value2 +  "</font>" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                    parseInt(parseInt(d.data.value2) *100 / parseInt(Sum)) + "    %" +
                    "</br>" +

                   d.data.type3 + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                   +"<font color=\"red\">" + d.data.value3 +  "</font>" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                    parseInt(parseInt(d.data.value3) *100 / parseInt(Sum)) + "    %" +
                    "</br>" +

                   d.data.type4 + "&emsp;&emsp;"
                   +"<font color=\"red\">" + d.data.value4 +  "</font>" 
                   + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                    parseInt(parseInt(d.data.value4) *100 / parseInt(Sum)) + "    %" +
                    "</br>" +

                    d.data.type5 + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                   +"<font color=\"red\">" + d.data.value5 +  "</font>" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
                    parseInt(parseInt(d.data.value5) *100 / parseInt(Sum)) + "    %" +
                    "</br>" 
                     + 'Total:'+ "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" 
                      

                    + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +"<font color=\"blue\">" + Sum + "</font>"
                );

                       
            
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
  
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
     .call(d3.axisLeft(y).ticks(0.5, "s"))
    .append("text")
      .attr("x", 12)
      .attr("y", y(y.ticks().pop()) + 0.9)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Value");

  /*var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 10 + ")"; });

  legend.append("rect")
      .attr("x", width + 5)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width + 120)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });*/
      
      
  
 var legend = serie.append("g")
      .attr("class", "legend")
      .attr("transform", function(d) { var d = d[d.length - 1]; return "translate(" + (x0(d.data.region) + x1(d.data.date) + x1.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")"; });

  legend.append("line")
      .attr("x1", 6)
      .attr("x2", 6)
      .attr("stroke", "#000");

  legend.append("text")
      .attr("x", 9)
      .attr("dy", "0.35em")
      .attr("fill", "#000")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.key; });
  
});

</script>

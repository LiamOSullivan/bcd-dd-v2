class MultiLineChart{

    constructor (_Element, _titleX, _titleY, _yLabels, _keys){
        // this.data = _data;
        this.element = _Element;
        this.titleX = _titleX;
        this.titleY = _titleY;
        this.yLabels = _yLabels;
        this.keys = _keys;

        this.init();
    }

    // initialise method to draw chart area
    init(){
        let dv = this;

        let elementNode = d3.select(dv.element).node();
        let elementWidth = elementNode.getBoundingClientRect().width; 
        let aspectRatio = elementWidth < 800 ? elementWidth * 0.65 : elementWidth * 0.5;

        const breakPoint = 678;
        
        // margin
        dv.margin = { 
            top: 50,
            bottom: 80
        };

        dv.margin.right = elementWidth < breakPoint ? 0 : 150;
        dv.margin.left = elementWidth < breakPoint ? 0 : 80;

        console.log(dv.margin);
        
        dv.width = elementWidth - dv.margin.left - dv.margin.right;
        dv.height = aspectRatio - dv.margin.top - dv.margin.bottom;
        
        // add the svg to the target element
        const svg = d3.select(dv.element)
            .append("svg")
            .attr("width", dv.width + dv.margin.left + dv.margin.right)
            .attr("height", dv.height + dv.margin.top + dv.margin.bottom);
       
        // add the g to the svg and transform by top and left margin
        dv.g = svg.append("g")
            .attr("transform", "translate(" + dv.margin.left + 
                ", " + dv.margin.top + ")");
        
        // set transition variable
        dv.t = function() { return d3.transition().duration(1000); };

        // dv.colour = d3.scaleOrdinal(d3.schemeBlues[9]);
        dv.colourScheme = ["#aae0fa","#00929e","#da1e4d","#ffc20e","#16c1f3","#086fb8","#003d68"];

        // set colour function
        dv.colour = d3.scaleOrdinal(dv.colourScheme.reverse());

        // for the tooltip from the d3 book
        dv.bisectDate = d3.bisector( d => { return d.date; } ).left;
        
        dv.addAxis();
    
    }

    addAxis(){       
        let dv = this;
        dv.yAxisCall = d3.axisLeft();

        dv.xAxisCall = d3.axisBottom();

        dv.xAxis = dv.g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + dv.height +")");
        
        dv.yAxis = dv.g.append("g")
            .attr("class", "y axis");

        // X title
        dv.xLabel = dv.g.append("text")
            .attr("class", "titleX")
            .attr("x", dv.width/2)
            .attr("y", dv.height + 60)
            .attr("text-anchor", "middle")
            .text(dv.titleX);

        // Y title
        dv.yLabel = dv.g.append("text")
            .attr("class", "titleY")
            .attr("x", - (dv.height/2))
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text(dv.titleY);

        // console.log("this is the width at scale function", dv.width);

        dv.addLegend();
        // dv.addSelectForm();
        
        // dv.getData();
    }

    getData( _valueString, _data){
        let dv = this;
        
        _data !== null ? dv.data =_data : dv.data = dv.data;
        dv.value = _valueString;

        dv.createScales();
    }

    createScales(){
        let dv = this;

        // set scales
        dv.x = d3.scaleTime().range([0, dv.width]);

        dv.y = d3.scaleLinear().range([dv.height, 0]);

        // Update scales
        dv.x.domain(d3.extent(dv.data[0].values, d => {
            return (d.date); }));
        
        // for the y domain to track negative numbers 
        const minValue = d3.min(dv.data, d => {
            return d3.min(d.values, d => { return d[dv.value]; });
        });

        // Set Y axis scales 0 if positive number else use minValue
        dv.y.domain([ minValue >=0 ? 0 : minValue,
            d3.max(dv.data, d => { 
            return d3.max(d.values, d => { return d[dv.value]; });
            })
        ]);

        // Update axes - what about ticks for smaller devices??
        dv.xAxisCall.scale(dv.x).tickFormat(d3.timeFormat("%Y"));
        dv.xAxis.transition(dv.t()).call(dv.xAxisCall);
        dv.yAxisCall.scale(dv.y);
        dv.yAxis.transition(dv.t()).call(dv.yAxisCall);

        // Update x-axis label based on selector
        // dv.xLabel.text(dv.variable);

        // Update y-axis label based on selector
        // var selectorKey = dv.keys.findIndex( d => {  return d === dv.variable; });
        // var newYLabel = dv.yLabels[selectorKey];
        // dv.yLabel.text(newYLabel);

        dv.update();
    }

    update(){
        let dv = this;

        d3.select(dv.element).select(".focus").remove();
        d3.select(dv.element).select(".focus_overlay").remove();

         // d3 line function
        dv.line = d3.line()
            .x( d => {
                return dv.x(d.date); 
            })
            .y( d => { //this works
                return dv.y(d[dv.value]); 
            }).curve(d3.curveCatmullRom);
            // .curve(d3.curveBasis);

        // Adapted from the tooltip based on the example in the d3 Book
        
        // 2. add the on mouseover and on mouseout to the joined data

        // select all regions and join data
        dv.regions = dv.g.selectAll(".regions")
            .data(dv.data);
        
        // update the paths
        dv.regions.select(".line")
            .transition(dv.t)
            .attr("d", d => { return dv.line(d.values); });
            // .attr("d", function(d) { 
            //     return d.active ? dv.line(d.values) : null; });
        
        // Enter elements
        dv.regions.enter().append("g")
            .attr("class", "regions")
            .append("path")
            .attr("class", "line")
            .attr("id", d => d.key)
            .attr("lineId", d => d.key)
            .attr("d", d => { return dv.line(d.values); })
            // .attr("d", function(d) { 
            //     return d.active ? dv.line(d.values) : null; })
            .style("stroke", d => { return dv.colour(d.key); })
            .style("stroke-width", "4px")
            .style("fill", "none");  
        
        // dv.regions.transition(dv.t)
        //     .attr("d", function (d) { return dv.line(d.values); });
            
        dv.regions.exit()
            .transition(dv.t).remove();
        
        dv.addTooltip();
    
    }

    addTooltip(){

        //build container and add to chart
        //draw tooltip
        // format data
        //get position
        //get values
        // reset function?
        // update Content function
        // update position and size
        // update title
        // date formatter or format before?
        // helper text wrap

        let dv = this;

        // add group to contain all the focus elements
        let focus = dv.g.append("g")
                .attr("class", "focus")
                .style("display", "none");
            
            // Year label
            focus.append("text")
                .attr("class", "focus_quarter")
                .attr("x", 9)
                .attr("y", 7);
            
            // Focus line
            focus.append("line")
                .attr("class", "focus_line")
                .attr("y1", 0)
                .attr("y2", dv.height);

        let bcdTooltip = focus.append("g")
                .attr("class", "bcd-tooltip")
                .attr("width", "250")
                .attr("height", "45");
            
        let toolGroup =  bcdTooltip.append("g")
                .attr("class", "tooltip-group");
            
            toolGroup.append("rect")
                .attr("class", "tooltip-container")
                .attr("width", "250")
                .attr("height", "45")
                .attr("rx", "3")
                .attr("ry", "3")
                .attr("fill","#ffffff")
                .attr("stroke", "#16c1f3")
                .attr("stroke-width", "1");

            toolGroup.append("text")
                .text("test tooltip")
                .attr("x", "5")
                .attr("y", "16")
                .attr("dy", ".35rem")
                .style("fill", "rgb(109, 113, 122)");

            toolGroup.append("line")
                .attr("x1","5")
                .attr("x2","240")
                .attr("y1","31")
                .attr("y2","31")
                .style("stroke", "#16c1f3");

        let tooltipBody = toolGroup.append("g")
            .attr("class", "tooltip-body")
            .style("transform", "translateY(8px)");
            
            // attach group append circle and text for each region
            dv.keys.forEach( (d,i) => {
            let tooltip = focus.append("g")
                    .attr("class", "tooltip_" + i);
    
                tooltip.append("circle")
                    .attr("r", 0)
                    .transition(dv.t)
                    .attr("r", 5)
                    .attr("fill", "white")
                    .attr("stroke", dv.colour(d));
    
                tooltip.append("text")
                    .attr("x", 9)
                    .attr("dy", ".35em");

            let tooltipBodyItem = tooltipBody.append("g")
                    .attr("class", "tooltipbody_" + i);

                tooltipBodyItem.append("text")
                    .attr("class", "tp-text-left")
                    .attr("x", "0")
                    .attr( "dy","1em");

                tooltipBodyItem.append("text")
                    .attr("class", "tp-text-right");

                tooltipBodyItem.append("circle")
                    .attr("class", "tp-circle")
                    .attr("r", "5");
    
            });
    
            // append a rectangle overlay to capture the mouse
            dv.g.append("rect")
                .attr("class", "focus_overlay")
                .attr("width", dv.width + 10) // give a little extra for last value
                .attr("height", dv.height)
                .style("fill", "none")
                .style("pointer-events", "all")
                .style("visibility", "hidden")
                .on("mouseover", () => { focus.style("display", null); })
                .on("mouseout", () => { focus.style("display", "none"); })
                .on("mousemove", mousemove);
            
            function mousemove(){
                focus.style("visibility","visible");
                let mouse = d3.mouse(this);
    
                dv.data.forEach((reg, idx) => {
                    // this is from the d3 book
                    let x0 = dv.x.invert(mouse[0]),
                    i = dv.bisectDate(reg.values, x0, 1), // use the biset for linear scale.
                    d0 = reg.values[i - 1],
                    d1 = reg.values[i],
                    d;  
    
                    d1 !== undefined ? d = x0 - d0.date > d1.date - x0 ? d1 : d0 : false;
                    
                    let id = ".tooltip_" + idx;
                    let tpId = ".tooltipbody_" + idx;

                    let tooltip = d3.select(dv.element).select(id);
                    let tooltipBody = d3.select(dv.element).select(tpId); 
                        tooltipBody.attr("transform", "translate(0," + idx * 40 + ")");
                    
                    if(d !== undefined){
                        tooltip.attr("transform", "translate(" + dv.x(d.date) + "," + dv.y(d[dv.value]) + ")");
                        tooltip.select("text").text(d[dv.value]);

                        // tooltipBody.attr("transform", "translate(" + dv.x(d.date) + "," + dv.y(d[dv.value]) + ")");
                        tooltipBody.select(".tp-text-left").text(dv.keys[idx]);
                        tooltipBody.select(".tp-text-right").text(d[dv.value]);
                        console.log("this is the data item", d);

                        focus.select(".focus_line").attr("transform", "translate(" + dv.x(d.date) + ", 0)");
                    }
                });
            }
    }

    addLegend(){
        let dv = this;

        // create legend group
        var legend = dv.g.append("g")
            .attr("transform", "translate(" + (0) + 
                        ", " + (0) + ")"); // if the legend needs to be moved

        // create legend array, this needs to come from the data.
        
        let legendArray = [];
        
        dv.keys.forEach( (d,i) => {

            let obj = {};
                obj.label = d;
                obj.colour = dv.colour(d);
                legendArray.push(obj);
        });

        // data.forEach(d => {
        //     for (var key in d) {
        //         // console.log(key);
        //         var obj = {};
        //         if (!(key === "type" || key === "region")){
        //         obj.type = d.type;
        //         obj.region = d.region;
        //         obj.year = key;
        //         obj.value = +d[key];
        //         legendArray.push(obj);
        //     }}
        // });

        // var legendArray = dv.regionData;
        // console.log(legendArray);

        // get data and enter onto the legend group
        var legends = legend.selectAll(".legend")
            .data(legendArray)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => { return "translate(0," + i * 40 + ")"; })
            .style("font", "12px sans-serif");

        // // get data and enter onto the legend group
        // legend = legend.selectAll(".legend")
        //     .data(dv.regionData)
        //     .enter().append("g")
        //     .attr("class", "legend")
        //     .attr("transform", function(d, i) { return "translate(0," + i * 40 + ")"; })
        //     .style("font", "12px sans-serif");
        
        // console.log("width at the legend draw", dv.width);
        // add legend boxes    
        legends.append("rect")
            .attr("class", "legendRect")
            .attr("x", dv.width + 25)
            .attr("width", 25)
            .attr("height", 25)
            .attr("fill", d => { return d.colour; })
            .attr("fill-opacity", 0.75);

        legends.append("text")
            .attr("class", "legendText")
            .attr("x", dv.width + 60)
            .attr("y", 12)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(d => { return d.label; }); 
    }

            // // taking from the d3 book
            // .on("click", d => {
            //     console.log(d);
            //     var active   = d.active ? false : true,
            //     newOpacity = active ? 1 : 0; 
            //     console.log("active", active);
            //     console.log("opactiy", newOpacity);
            //     // Hide or show the elements based on the ID
            //     d3.select("#"+d.label)
            //         .transition().duration(100) 
            //         .style("opacity", newOpacity); 
            //     d3.select(dv.element).select(".tooltip_"+d.label)
            //         .transition().duration(100) 
            //         .style("opacity", newOpacity);

            //     // Update whether or not the elements are active
            //     d.active = active;
            //     });

        // add legend text
    
    // addSelectForm(){
    //     var dv = this

    //     dv.list = d3.select("#seriesMenu1")
    //         .append("select")
    //         .attr("class","form-control");

    //     dv.list.selectAll("option")
    //     // add the data and join
    //         .data(keys)
    //         .enter()
    //     // append option with type name as value and text
    //         .append("option")
    //         .attr("value", d => d)
    //         .text( d => d );
        
    //     dv.list.on("change", function(){
    //         mlineChart.getData();
    //     });
    // }

    // textWrap(text, width, xpos = 0) {
    //     text.each(function() {
    //         let words,
    //             word,
    //             line,
    //             lineNumber,
    //             lineHeight,
    //             y,
    //             dy,
    //             tspan;

    //         text = d3Selection.select(this);

    //         words = text.text().split(/\s+/).reverse();
    //         line = [];
    //         lineNumber = 0;
    //         lineHeight = 1.2;
    //         y = text.attr('y');
    //         dy = parseFloat(text.attr('dy'));
    //         tspan = text
    //             .text(null)
    //             .append('tspan')
    //             .attr('x', xpos)
    //             .attr('y', y)
    //             .attr('dy', dy + 'em');

    //         while ((word = words.pop())) {
    //             line.push(word);
    //             tspan.text(line.join(' '));

    //             // fixes for IE wrap text issue
    //             const textWidth = getTextWidth(line.join(' '), 16, 'Karla, sans-serif');

    //             if (textWidth > width) {
    //                 line.pop();
    //                 tspan.text(line.join(' '));

    //                 if (lineNumber < entryLineLimit - 1) {
    //                     line = [word];
    //                     tspan = text.append('tspan')
    //                         .attr('x', xpos)
    //                         .attr('y', y)
    //                         .attr('dy', ++lineNumber * lineHeight + dy + 'em')
    //                         .text(word);
    //                 }
    //             }
    //         }
    //     });

    // }

}

//     let tpOffset = {
//         y: -25,
//         x: 0
//     }

// function getTooltipPosition([mouseX, mouseY]){
//     let tooltipX, tooltipY;

//     // show tooltip on the right
//     if ((mouseX - 250) < 0) {
//         // Tooltip on the right
//         tooltipX = 250 - 185;
//     } else {
//         // else show tooltip to the left
//         tooltipX = -205
//     }

//     if (mouseY) {
//         tooltipY = tpOffset.y;
//         // tooltipY = mouseY + tpOffset.y;
//     } else {
//         tooltipY = tpOffset.y;
//     }

//     return [tooltipX, tooltipY];
// }

// console.log("mouse position test", getTooltipPosition([300, 300]));
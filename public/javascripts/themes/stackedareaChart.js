class StackedAreaChart {

    // constructor function
    constructor (_element, _titleX, _titleY, _dateVariable, _keys, _cScheme){

        // load in arguments from config object
        this.element = _element;
        this.titleX = _titleX;
        this.titleY = _titleY;
        this.date = _dateVariable;
        this.keys = _keys;
        this.cScheme = _cScheme;
        
        // create the chart
        this.init();
    }

    // initialise method to draw chart area
    init(){
        let c = this,
            elementNode = d3.select(c.element).node(),
            elementWidth = elementNode.getBoundingClientRect().width,
            aspectRatio = elementWidth < 800 ? elementWidth * 0.55 : elementWidth * 0.5;

            d3.select(c.element).select("svg").remove();
            
        const breakPoint = 678;
        
        // margin
        c.margin = { };

        c.margin.top = elementWidth < breakPoint ? 30 : 50;
        c.margin.bottom = elementWidth < breakPoint ? 30 : 60;

        c.margin.right = elementWidth < breakPoint ? 12.5 : 150;
        c.margin.left = elementWidth < breakPoint ? 20 : 80;
        
        c.width = elementWidth - c.margin.left - c.margin.right;
        c.height = aspectRatio - c.margin.top - c.margin.bottom;

        // select parent element and append SVG + g
        const svg = d3.select(c.element)
            .append("svg")
            .attr("width", c.width + c.margin.left + c.margin.right)
            .attr("height", c.height + c.margin.top + c.margin.bottom);

        c.g = svg.append("g")
            .attr("transform", "translate(" + c.margin.left + 
                ", " + c.margin.top + ")");

        // default transition 
        c.t = () => { return d3.transition().duration(1000); };
        c.ease = d3.easeQuadInOut;
        
        // c.colourScheme = ["#aae0fa","#00929e","#ffc20e","#16c1f3","#da1e4d","#086fb8",'#1d91c0','#225ea8','#0c2c84'];
        
        // default colourScheme
        c.cScheme = c.cScheme ? c.cScheme : d3.schemeBlues[9].slice(4);
        
        // colour function
        c.colour = d3.scaleOrdinal(c.cScheme);

        // bisector for tooltip
        c.bisectDate = d3.bisector(d => { return (d[c.date]); }).left;

        // tick numbers
        c.tickNumber = "undefined";

        // tick formats
        c.tickFormat = "undefined";

        c.addAxis();
    }

    addAxis(){
        let c = this;

        c.yAxisCall = d3.axisLeft();
        c.xAxisCall = d3.axisBottom();

        c.gridLines = c.g.append("g")
            .attr("class", "grid-lines");

        c.xAxis = c.g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + c.height +")");

        c.yAxis = c.g.append("g")
            .attr("class", "y-axis");

        // X title
        c.xLabel = c.g.append("text")
            .attr("class", "titleX")
            .attr("x", c.width/2)
            .attr("y", c.height + 50)
            .attr("text-anchor", "start")
            .text(c.titleX);

        // Y title
        c.yLabel = c.g.append("text")
            .attr("class", "titleY")
            .attr("x", - (c.height/2))
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text(c.titleY);

        // call the legend method
        c.addLegend();
    }

    // pass the data and the nest value
    getData(_data, _tX, _tY, yScaleFormat){
        let c = this;
            c.yScaleFormat = c.formatValue(yScaleFormat);
            
            _tX ? c.titleX = _tX: c.titleX = c.titleX;
            _tY ? c.titleY = _tY: c.titleY = c.titleY;
            
            c.nestedData =_data;
            // c.tickNumber =  c.nestedData.length;
            c.createScales();
    }

    createScales(){
        let c = this;

        // set scales
        c.x = d3.scaleTime().range([0, c.width]);
        c.y = d3.scaleLinear().range([c.height, 0]);

        // get the the combined max value for the y scale
        let maxDateVal = d3.max(c.nestedData, d => {
            let vals = d3.keys(d).map(key => { 
                return key === c.date || typeof d[key] === 'string' ? 0:d[key];
                // return key !== c.date ? d[key] : 0;
            });
            return d3.sum(vals);
        });

        // Update scales
        c.x.domain(d3.extent(c.nestedData, (d) => { return (d[c.date]); }));
        c.y.domain([0, maxDateVal]);

        c.drawGridLines();

        // Update axes
        c.tickNumber !== "undefined" ? 
                    c.xAxisCall.scale(c.x).ticks(c.tickNumber)
                    : c.xAxisCall.scale(c.x);

        c.xAxis.transition(c.t()).call(c.xAxisCall);

        c.yAxisCall.scale(c.y);
        c.yAxis.transition(c.t()).call(c.yAxisCall);
        
        c.arealine = d3.line()
            .defined(function(d) { return !isNaN(d[1]); })
            // .curve(c.area.curve())
            .x(d => { return c.x(d.data[c.date]); })
            .y(d => { return c.y( d[1]); });


        // d3 area function
         c.area = d3.area()
            .defined(function(d) { return !isNaN(d[1]); })
            .x(function(d) { return c.x(d.data[c.date]); })
            .y0(function(d) { return c.y(d[0]); })
            .y1(function(d) { return c.y( d[1]); });

         // d3 stack function
        c.stack = d3.stack().keys(c.keys);
        c.data = (c.stack(c.nestedData));

        c.drawTooltip();
        c.update();
    }

    update(){
        let c = this;
            d3.select(c.element).select(".focus").remove();
            d3.select(c.element).select(".focus_overlay").remove();
            c.g.selectAll(".region")
                .transition(c.t())
                .style("opacity", 0)
                .remove(); // cheap fix for now

        // select all regions and join data with old
        c.regions = c.g.selectAll(".area")
            .data(c.data, d => { return d})
            .enter()
                .append("g")
                    .attr("class","region");
        
        // remove old data not working
        // c.regions
        //     .exit()
        //     .transition(c.t())
        //     .style("opacity", 0)
        //     .remove();

        c.regions
            .append("path")
            .attr("class", "area")
            .attr("d", c.area)
            .style("fill-opacity", 0.75)
            .style("fill", (d) => {return c.colour(d.key);}) ;
            
    
        c.regions
            .append("path")
            .attr("class", "area-line")
            .attr("d", c.arealine)
            .style("stroke", (d) => {return c.colour(d.key);});
            

        // Update
        c.g.selectAll(".area")
            .data(c.data)
            .transition(c.t())
            .attr("d", c.area)
            .style("fill-opacity", 0.75)
            .style("fill", (d) => {return c.colour(d.key);});
            
    
        c.g.selectAll(".area-line")
            .data(c.data)
            .transition(c.t())
            .attr("d", c.arealine);
    
    }

    addLegend(){
        let c = this;

        // create legend group
        var legend = c.g.append("g")
            .attr("transform", "translate(0,0)");

        // create legend array, this needs to come from the data.
        c.legendArray = [];
        
        c.keys.forEach( (d) => {

            let obj = {};
                obj.label = d;
                obj.colour = c.colour(d);
                c.legendArray.push(obj);
        });
        c.legendArray.reverse();

        // get data and enter onto the legend group
        let legends = legend.selectAll(".legend")
            .data(c.legendArray)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => { return "translate(0," + i * 40 + ")"; })
            .attr("id", (d,i) => "legend-item" + i )
            .style("font", "12px sans-serif");
        
        // add legend boxes    
        legends.append("rect")
            .attr("class", "legendRect")
            .attr("x", c.width + 10)
            .attr("width", 25)
            .attr("height", 25)
            .attr("fill", d => { return d.colour; })
            .attr("fill-opacity", 0.75);

        legends.append("text")
            .attr("class", "legendText")
            // .attr("x", c.width + 40)
            .attr("y", 12)
            .attr("dy", ".025em")
            .attr("text-anchor", "start")
            .text(d => { return d.label; })
            .call(c.textWrap, 110, c.width + 34); 
    }

    drawGridLines(){
        let c = this;

        c.gridLines.selectAll('line')
            .remove();

        c.gridLines.selectAll('line.horizontal-line')
            .data(c.y.ticks)
            .enter()
                .append('line')
                .attr('class', 'horizontal-line')
                .attr('x1', (0))
                .attr('x2', c.width)
                .attr('y1', (d) => { return c.y(d) })
                .attr('y2', (d) => c.y(d));
    }

    drawTooltip(){
        let c = this;

            c.newToolTip = d3.select(c.element)
                .append("div")
                    .attr("class","tool-tip bcd")
                    .style("visibility","hidden");

            c.newToolTipTitle = c.newToolTip
                .append("div")
                    .attr("id", "bcd-tt-title");

            c.tooltipHeaders();
            c.tooltipBody();
    }

    tooltipHeaders(){
        let c = this,
            div,
            p;
            
        div = c.newToolTip
            .append("div")
                .attr("class", "headers");

        div.append("span")
            .attr("class", "bcd-rect");

        p = div
            .append("p")
                .attr("class","bcd-text");

        p.append("span")
            .attr("class","bcd-text-title")
            .text("Type");

        p.append("span")
            .attr("class","bcd-text-value")
            .text("Value");

        p.append("span")
            .attr("class","bcd-text-rate")
            .text("% Rate");

        p.append("span")
            .attr("class","bcd-text-indicator");
    }

    tooltipBody(){
        let c = this,
            keys = c.keys,
            div,
            p;

        keys.forEach( (d, i) => {
            div = c.newToolTip
                    .append("div")
                    .attr("id", "bcd-tt" + i);
                
            div.append("span").attr("class", "bcd-rect");

            p = div.append("p").attr("class","bcd-text");

            p.append("span").attr("class","bcd-text-title");
            p.append("span").attr("class","bcd-text-value");
            p.append("span").attr("class","bcd-text-rate");
            p.append("span").attr("class","bcd-text-indicator");
        });
    }

    addTooltip(title, format, arrowChange){

        let c = this;
            // ttData = data;
            c.arrowChange = arrowChange;
            c.ttTitle = title;
            c.valueFormat = format;
            c.ttWidth = 280,
            c.ttHeight = 50,//remove
            c.ttBorderRadius = 3; //remove

            // formats thousands, Millions, Euros and Percentage

        // add group to contain all the focus elements
        let focus = c.g.append("g")
                .attr("class", "focus")
                .style("visibility", "hidden");
            
            // Year label
            focus.append("text")
                .attr("class", "focus_quarter")
                .attr("x", 9)
                .attr("y", 7);
            
            // Focus line
            focus.append("line")
                .attr("class", "focus_line")
                .attr("y1", 0)
                .attr("y2", c.height);
        
            focus.append("g")
                .attr("class", "focus-circles");

            c.keys.forEach( (d,i) => {
                
                c.drawFocusCircles(d,i);

            });
    
            // append a rectangle overlay to capture the mouse
            c.g.append("rect")
                .attr("class", "focus_overlay")
                .attr("width", c.width + 10) // give a little extra for last value
                .attr("height", c.height)
                .style("fill", "none")
                .style("pointer-events", "all")
                .style("visibility", "hidden")
                .on("mouseover", () => { 
                    focus.style("display", null); 
                    bcdTooltip.style("display", "inline");
                }, {passive:true})
                .on("touchstart", ()=>{
                    focus.style("display", null); 
                    bcdTooltip.style("display", "inline");
                },{passive:true})
                .on("mouseout", () => { 
                    focus.style("display", "none"); 
                    bcdTooltip.style("display", "none");
                }, {passive:true})
                .on("touchmove", mousemove, {passive:true})
                .on("mousemove", mousemove, {passive:true});
            
            function mousemove(){
                focus.style("visibility","visible");
                toolGroup.style("visibility","visible");

                let mouse = d3.mouse(this),
            
                    ttTextHeights = 0,
                    x0 = c.x.invert(mouse[0]),
                    i = c.bisectDate(c.nestedData, x0, 1), // use the bisect for linear scale.
                    d0 = c.nestedData[i - 1],
                    d1 = c.nestedData[i],
                    d,
                    dPrev;  

                d1 !== undefined ? d = x0 - d0[c.date] > d1[c.date] - x0 ? d1 : d0 : false;
                d1 !== undefined ? dPrev = x0 - d0[c.date] > d1[c.date] - x0 ? c.nestedData[i-1] : c.nestedData[i-2] : false;
            
                let length = c.keys.length - 1;
                
                c.keys.forEach( (reg,idx) => {
                    
                    let reverseIndex = (length-idx),
                        dvalue = c.data[reverseIndex],
                        key = c.keys[reverseIndex],
                        id = ".tooltip_" + reverseIndex,
                        tpId = ".tooltipbody_" + reverseIndex,
                        ttTitle = c.g.select(".tooltip-title"),
                        dd0 = dvalue[i - 1],
                        dd1 = dvalue[i],
                        dd,
                        unText = "unavailable",
                        difference = dPrev ? (d[key] -  dPrev[key])/dPrev[key]: 0,
                        indicatorColour,
                        indicatorSymbol = difference > 0 ? " ▲" : difference < 0 ? " ▼" : "",
                        diffPercentage = isNaN(difference) ? unText :d3.format(".1%")(difference),
                        rateString = (diffPercentage + " " +indicatorSymbol),
                        tooltip,
                        tooltipBody,
                        textHeight;

                    if(c.arrowChange === true){
                        indicatorColour = difference < 0 ? "#20c997" : difference > 0 ? "#da1e4d" : "#f8f8f8";
                    }
                    else{
                        indicatorColour = difference > 0 ? "#20c997" : difference < 0 ? "#da1e4d" : "#f8f8f8";
                    }

                    tooltip = d3.select(c.element).select(id);
                    tooltipBody = d3.select(c.element).select(tpId);
                    textHeight = tooltipBody.node().getBBox().height ? tooltipBody.node().getBBox().height : 0;
                    tooltipBody.attr("transform", "translate(5," + ttTextHeights +")");
                        
 
                    if(d !== undefined){
                        
                        c.updatePosition(c.x(d[c.date]), 0);

                        dd1 !== undefined ? dd = x0 - dd0.data[c.date] > dd1.data[c.date] - x0 ? dd1 : dd0 : false;

                        tooltip.attr("transform", "translate(" + c.x(d[c.date]) + "," + c.y(dd[1] ? dd[1]: 0 ) + ")");
                        tooltipBody.select(".tp-text-right").text(isNaN(d[key]) ? "" : d[key]);
                        tooltipBody.select(".tp-text-indicator")
                            .text(rateString)
                            .attr("fill",indicatorColour);
                        ttTitle.text(c.ttTitle + " " + (d.label)); //label needs to be passed to this function 
                        focus.select(".focus_line").attr("transform", "translate(" + c.x((d[c.date])) + ", 0)");
                    }

                    ttTextHeights += textHeight + 6;
                });
            }
    }

    OlddrawTooltip(){
        let c = this;

        let tooltipTextContainer = c.g.select(".tooltip-group")
          .append("g")
            .attr("class","tooltip-text")
            .attr("fill","#f8f8f8");

        let tooltip = tooltipTextContainer
            .append("rect")
            .attr("class", "tooltip-container")
            .attr("width", c.ttWidth)
            .attr("height", c.ttHeight)
            .attr("rx", c.ttBorderRadius)
            .attr("ry", c.ttBorderRadius)
            .attr("fill","#001f35e6")
            .attr("stroke", "#6c757d")
            .attr("stroke-width", 2);

        let tooltipTitle = tooltipTextContainer
          .append("text")
            .text("test tooltip")
            .attr("class", "tooltip-title")
            .attr("x", 5)
            .attr("y", 16)
            .attr("dy", ".35em")
            .style("fill", "#a5a5a5");

        let tooltipDivider = tooltipTextContainer
            .append("line")
                .attr("class", "tooltip-divider")
                .attr("x1", 0)
                .attr("x2", c.ttWidth)
                .attr("y1", 31)
                .attr("y2", 31)
                .style("stroke", "#6c757d");

        let tooltipBody = tooltipTextContainer
                .append("g")
                .attr("class","tooltip-body")
                .attr("transform", "translate(5,45)");
    }

    drawFocusCircles(d,i){
        let c = this;

        let tooltip = c.g.select(".focus-circles")
            .append("g")
            .attr("class", "tooltip_" + i);

            tooltip.append("circle")
                .attr("r", 0)
                .transition(c.t)
                .attr("r", 5)
                .attr("fill", c.colour(d))
                .attr("stroke", c.colour(d));
    }

    updatePosition(xPosition, yPosition){
        let c = this;
        // get the x and y values - y is static
        let [tooltipX, tooltipY] = c.getTooltipPosition([xPosition, yPosition]);
        // move the tooltip
        c.g.select(".bcd-tooltip").attr("transform", "translate(" + tooltipX + ", " + tooltipY +")");
    }

    updateTTSize(){
        let c = this;
        let h = c.g.select(".tooltip-body").node().getBBox().height;
        c.ttHeight += h + 4;
        c.g.select(".tooltip-container").attr("height", c.ttHeight);
    }

    resetSize() {
        let c = this;
        c.ttHeight = 50;
    }

    getTooltipPosition([mouseX, mouseY]) {
        let c = this;
        let ttX,
            ttY = mouseY;

        // show right
        if (mouseX < c.width - c.ttWidth) {
            ttX = mouseX + 10;
        } else {
            // show left
            ttX = mouseX - 290
        }
        return [ttX, ttY];
    }

    textWrap(text, width, xpos = 0, limit=2) {
        text.each(function() {
            let words,
                word,
                line,
                lineNumber,
                lineHeight,
                y,
                dy,
                tspan;

            text = d3.select(this);
    
            words = text.text().split(/\s+/).reverse();
            line = [];
            lineNumber = 0;
            lineHeight = 1;
            y = text.attr("y");
            dy = parseFloat(text.attr("dy"));
            tspan = text
                .text(null)
                .append("tspan")
                .attr("x", xpos)
                .attr("y", y)
                .attr("dy", dy + "em");
    
            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));

                if (tspan.node() && tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));

                    if (lineNumber < limit - 1) {
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", xpos)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                        // if we need two lines for the text, move them both up to center them
                        text.classed("move-up", true);
                    } else {
                        line.push("...");
                        tspan.text(line.join(" "));
                        break;
                    }
                }
            }
        });
    }

    formatValue(format){
        // formats thousands, Millions, Euros and Percentage
        switch (format){
            case "millions":
                return d3.format(".2s");
                break;
        
            case "euros":
                return "undefined";
                break;
        
            case "thousands":
                return d3.format(",");
                break;
        
            case "percentage":
                return d3.format(".2%");
                break;
        
            default:
                return "undefined";
        }
    }

    formatQuarter(date, i){
        let newDate = new Date();
        newDate.setMonth(date.getMonth() + 1);
        let year = (date.getFullYear());
        let q = Math.ceil(( newDate.getMonth()) / 3 );
        return year+" Q" + q;
    }

slicer( arr, sliceBy ){
    if ( sliceBy < 1 || !arr ) return () => [];
    
    return (p) => {
        const base = p * sliceBy,
              size = arr.length;

        let slicedArray = p < 0 || base >= arr.length ? [] : arr.slice( base,  base + sliceBy );
            
            if (slicedArray.length < (sliceBy/2)) return slicedArray = arr.slice(size - sliceBy);
            
            return slicedArray;
    };
}

pagination(_data, _selector, _sliceBy, _pageNumber, _label, _text, _format, _arrow){

    const chartObj = this;
    
    const slices = chartObj.slicer( _data, _sliceBy ), 
          times =  _pageNumber,
          startSet = slices(times - 1);
          
        //  let newStart = [];
        //  startSet.length < _sliceBy ? newStart = _data.slice(50 - _sliceBy) : newStart = startSet;

        d3.selectAll(_selector + " .pagination-holder").remove();

    let moreButtons = d3.select(_selector)
        .append("div")
        .attr("class", "pagination-holder text-center pb-2");

        chartObj.getData(startSet);
        chartObj.addTooltip(_text,_format ,_arrow);

    for(let i=0; i<times; i++){
        // let wg = slices(i)
            // wg.length < _sliceBy ? wg = _data.slice(50 - _sliceBy) : wg;
        
        let wg = slices(i),
            sliceNumber = _sliceBy - 1,
            secondText;

            if (typeof wg[sliceNumber] != 'undefined'){
                secondText = wg[sliceNumber]
            }
            else{
                let lastEl = wg.length - 1;
                    secondText = wg[lastEl];
            }

        let textString = _label === "year" ? wg[sliceNumber][_label] : wg[0][_label] + " - " + secondText[_label];

        moreButtons.append("button")
            .attr("type", "button")
            .attr("class", i === times -1 ? "btn btn-page mx-1 active" : "btn btn-page")
            .style("border-right", i === times -1 ? "none" : "1px Solid #838586")
        // .text(_label + " " + (1+(i*_sliceBy)) +" - "+ ((i+1)*_sliceBy)) // pass this to the function
            .text(textString)
            .on("click", function(){
            if(!$(this).hasClass("active")){
                    $(this).siblings().removeClass("active");
                    $(this).addClass("active");
                    chartObj.getData(wg);
                    chartObj.addTooltip(_text, _format, _arrow);
                }
            });
        }
    }

}



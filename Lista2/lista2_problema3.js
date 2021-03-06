//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

function renderDataset(){
    //
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, width]);
    //
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([height,0]);

    //
    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([5,8]);

    //
    var cScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range(["gray","red"]);
    
    
    //
    var xAxis = d3.axisBottom(xScale).ticks(6);		  
    var xAxisGroup = d3.select("#xAxis")
	.transition()
	.call(xAxis);

    //
    var yAxis = d3.axisLeft(yScale).ticks(6);		  
    var yAxisGroup = d3.select("#yAxis").transition().call(yAxis);		    		  	

    //
    var circleSelection = svg.select("#circles").selectAll("circle")
	.data(dataset);

    //Remove circles that are not needed
    circleSelection
	.exit()
	.attr("fill","rgba(255, 255, 255, 0)")
	.remove();
    
    //Create circles
    circleSelection
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return 1.5;
	})
	.attr("fill", function(d){
	    return "black";
	})

    //
    circleSelection
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return 1,5;
	})
    .on("mouseup", function(){d3.select(this).style("fill", "red");});
    
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    renderDataset();
	});
    
    //Create SVG element
    var crudeSVG = d3.select("body")
	.append("svg");

    var svg = crudeSVG
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //
    var circlesGroup = svg.append("g").attr("id","circles");
    
    //
    svg.append("g").attr("id","xAxis").attr("transform","translate(0," + (height - margin.bottom) + ")");
    svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");
    
    return svg;
}		  		  		  

//
var svg = init();

svg.on( "mousedown", function() {
var p = d3.mouse( this);
console.log(p)

svg.append( "rect")
    .attr({
        rx      : 6,
        ry      : 6,
        class   : "selection",
        x       : p[0],
        y       : p[1],
        width   : 0,
        height  : 0
    })
})
.on( "mousemove", function() {
    var s = svg.select( "rect.selection");

    if( !s.empty()) {
        var p = d3.mouse( this),

            d = {
                x       : parseInt( s.attr( "x"), 10),
                y       : parseInt( s.attr( "y"), 10),
                width   : parseInt( s.attr( "width"), 10),
                height  : parseInt( s.attr( "height"), 10)
            },
            move = {
                x : p[0] - d.x,
                y : p[1] - d.y
            }
        ;

        console.log(d)

        if( move.x < 1 || (move.x*2<d.width)) {
            d.x = p[0];
            d.width -= move.x;
        } else {
            d.width = move.x;       
        }

        if( move.y < 1 || (move.y*2<d.height)) {
            d.y = p[1];
            d.height -= move.y;
        } else {
            d.height = move.y;       
        }
       
        s.attr( d);
        //console.log( d);
    }
})
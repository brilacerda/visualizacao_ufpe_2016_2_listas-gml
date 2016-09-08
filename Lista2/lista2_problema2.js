//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//
var generator  = d3.randomUniform(0, 1);
var colorScale = colorbrewer.Paired[12];
//			
var dataset = [];

function updateDataset(){
    
    var numPoints = 5;
    var newDataset = Array.apply(null, Array(numPoints)).map(function() { return generator(); });
    var totalSum = d3.sum(newDataset);
    newDataset =  newDataset.map(function(d){return d/totalSum;});
    
    dataset = newDataset;
}

function pieChart(probabilities, colors){
    var moveTo = 400;
    var radius = 150;
    var slices = [];

    sum = probabilities.reduce(function(a, b){
        return a + b
    });

    angles = probabilities.map(function(a){
        return (a*360)/sum
    });

    var startAngle = 0;
    var endAngle = 0;
    var obt;
    var d;

    for (var i = 0; i < angles.length; i++){
        startAngle = endAngle;
        endAngle = startAngle + angles[i];
        obt = 0;

        if (angles[i] > 180)
            obt = 1;

        x1 = parseInt(Math.round(moveTo + radius*Math.cos(Math.PI*startAngle/180)));
        y1 = parseInt(Math.round(moveTo + radius*Math.sin(Math.PI*startAngle/180)));

        x2 = parseInt(Math.round(moveTo + radius*Math.cos(Math.PI*endAngle/180)));
        y2 = parseInt(Math.round(moveTo + radius*Math.sin(Math.PI*endAngle/180)));

        d = "M" + moveTo + "," + moveTo +
            " L" + x1 + "," + y1 +
            " A" + radius + "," + radius + 
            " 1 " + obt + ",1 " +
            x2 + "," + y2 + 
            " z";

        slices[i] = [d , colors[i]];

        // console.log(d);
        // var x = d3.select("g").append("path")
        //               .attr("d", d)
        //               .attr("fill", colors[i])
    }
    return slices;
}

function renderDataset(){
    var slicePaths = pieChart(dataset, colorScale);

    var pieSlices = d3.select("g").selectAll("path").data(slicePaths);

    //remove o que existir no g
    pieSlices
            .enter().append("path")
            .attr("d", function(slice){
               return slice[0]
            })
            .attr("fill", function(slice){
               return slice[1]
            })

    pieSlices.exit().remove();


    pieSlices
            .transition()
            .delay(200)
            .duration(1000)
            .attr("d", function(slice){
               return slice[0]
            })
            .attr("fill", function(slice){
               return slice[1]
            })

    //Codigo para fazer insercao/remocao/update de elementos    
    //em algum momento voce provavelmente vai querer chamar algo como:
    //                                      pieChart(dataset,colorScale.slice(0,5))
    
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    updateDataset();
	    renderDataset();
	});
    
    //Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + 0 + "," + -200 + ")");
    
    return svg;
}		  		  		  

//
var svg = init();

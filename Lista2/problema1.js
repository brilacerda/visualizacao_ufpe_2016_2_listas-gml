var svg = document.getElementById("mysvg");
var probabilities = [25, 50, 10, 15];
var colors = ["#FAFAD2", "E6BE8A", "#A0522D", "CD853F"];
var moveTo = 400;
var radius = 200;


function getAngles(probabilities){
	sum = probabilities.reduce(function(a, b){
		return a + b
	});

	return probabilities.map(function(a){
		return (a*360)/sum
	});
}

function drawArcs(angles){
	var startAngle = 0;
	var endAngle = 0;

	for (var i = 0; i < angles.length; i++){
		startAngle = endAngle;
		endAngle = startAngle + angles[i];

		x1 = parseInt(Math.round(moveTo + radius*Math.cos(Math.PI*startAngle/180)));
        y1 = parseInt(Math.round(moveTo + radius*Math.sin(Math.PI*startAngle/180)));

        x2 = parseInt(Math.round(moveTo + radius*Math.cos(Math.PI*endAngle/180)));
        y2 = parseInt(Math.round(moveTo + radius*Math.sin(Math.PI*endAngle/180)));

		var d = "M" + moveTo + "," + moveTo +
			" L" + x1 + "," + y1 +
			" A" + radius + "," + radius + 
			" 1 0,1 " +
			x2 + "," + y2 + 
			" z";
	
		console.log(d);
		d3.select("g").append("path")
					  .attr("d", d)
					  .attr("fill", colors[i])

		/*svg = document.getElementById("mysvg");
		arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
		arc.setAttribute("d", d);
		arc.setAttribute("fill", colors[i]);
		svg.append(arc);*/
	}
	return arcs
}

function pieChart(probabilities,colors){
	angles = getAngles(probabilities);
	pieSlices = drawArcs(angles);
}

pieChart(probabilities, colors)	
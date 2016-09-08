	var probabilities = [20, 80];
	var colors = ["#FAFAD2", "#E6BE8A", "#A0522D", "#CD853F"];


function pieChart(probabilities,colors){
	var moveTo = 400;
	var radius = 200;

	sum = probabilities.reduce(function(a, b){
		return a + b
	});

	angles = probabilities.map(function(a){
		return (a*360)/sum
	});

	var startAngle = 0;
	var endAngle = 0;
	var d;
	var obt;

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
        
		var d = "M" + moveTo + "," + moveTo +
			" L" + x1 + "," + y1 +
			" A" + radius + "," + radius + 
			" 1 "+ obt +",1 " +
			x2 + "," + y2 + 
			" z";
	
		console.log(d);
		var x = d3.select("svg").append("path")
					  .attr("d", d)
					  .attr("fill", colors[i])
	}
}

pieChart(probabilities, colors)	
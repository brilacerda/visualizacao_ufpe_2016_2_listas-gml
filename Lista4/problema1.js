var twentythirteen = []
var twentyfourteen = []
var twentyfifteen = []
var twentysixteen = []
var min = []
var mean = []
var max = []
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov', 'Dec']
var y_max = 0
var y_min = 100

//Width and height
var margin = {top: 10, right: 50, bottom: 10, left: 20};
var width = 1200 - margin.left - margin.right;
var height = 550 - margin.top - margin.bottom;


//Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + 0 + "," + 500 + ") scale(" + 1 + "," + -1 + ")")
// Load the data
separatePerYear()

var xScale = d3.scaleBand().rangeRound([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);
xScale.domain(month.map(function(m){ return m; }))

function boxPlot(year, tempType){
	dataset = getDataset(year, tempType);
	filteredData = getInformations(dataset);

	yScale.domain([y_max, y_min])
	console.log("yScale ", y_max, y_min)
	
	d3.select('svg').append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    d3.select('svg').append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(yScale));
	
	var line1 = d3.select("g").selectAll("line").data(filteredData);
	var line2 = d3.select("g").selectAll("line").data(filteredData);
	var line3 = d3.select("g").selectAll("line").data(filteredData);
	var line4 = d3.select("g").selectAll("line").data(filteredData);
	var rectangles = d3.select("g").selectAll("rect").data(filteredData)


	line1.enter().append("line")
        .attr("x1", function(d){ return (d.month*90); })
        .attr("y1", function(d){ return (d.supLimit*5); })
        .attr("x2", function(d){ return (d.month*90); })
        .attr("y2", function(d){ return (d.infLimit*5); })
        .attr("stroke", 'black'); 
    
    rectangles.enter().append("rect")
        .attr("x", function(d){ return (d.month*90 - 25); })
        .attr("y", function(d){ return (d.fstQuartile*5); })
        .attr("height", function(d){ return ((d.trdQuartile-d.fstQuartile)*5); })
        .attr("width", function(d){ return (50); })
        .attr("stroke", 'black')
        .attr("fill", 'white');  
        
	line2.enter().append("line")
        .attr("x1", function(d){ return (d.month*90 - 25); })
        .attr("y1", function(d){ return (d.sndQuartile*5); })
        .attr("x2", function(d){ return (d.month*90 + 25); })
        .attr("y2", function(d){ return (d.sndQuartile*5); })
        .attr("stroke", 'black');   
    
    line3.enter().append("line")
        .attr("x1", function(d){ return (d.month*90 - 15); })
        .attr("y1", function(d){ return (d.supLimit*5); })
        .attr("x2", function(d){ return (d.month*90 + 15); })
        .attr("y2", function(d){ return (d.supLimit*5); })
        .attr("stroke", 'black');
    line4.enter().append("line")
        .attr("x1", function(d){ return (d.month*90 - 15); })
        .attr("y1", function(d){ return (d.infLimit*5); })
        .attr("x2", function(d){ return (d.month*90 + 15); })
        .attr("y2", function(d){ return (d.infLimit*5); })
        .attr("stroke", 'black');


    line1.exit().remove();
    line2.exit().remove();
    line3.exit().remove();
    line4.exit().remove();
	rectangles.exit().remove();


	line1
        .attr("x1", function(d){ return (d.month*90); })
        .attr("y1", function(d){ return (d.supLimit*5); })
        .attr("x2", function(d){ return (d.month*90); })
        .attr("y2", function(d){ return (d.infLimit*5); })
        .attr("stroke", 'black'); 
    
    rectangles
        .attr("x", function(d){ return (d.month*90 - 25); })
        .attr("y", function(d){ return (d.fstQuartile*5); })
        .attr("height", function(d){ return ((d.trdQuartile-d.fstQuartile)*5); })
        .attr("width", function(d){ return (50); })
        .attr("stroke", 'black')
        .attr("fill", 'white');  
        
	line2
        .attr("x1", function(d){ return (d.month*90 - 25); })
        .attr("y1", function(d){ return (d.sndQuartile*5); })
        .attr("x2", function(d){ return (d.month*90 + 25); })
        .attr("y2", function(d){ return (d.sndQuartile*5); })
        .attr("stroke", 'black');   
    
    line3
        .attr("x1", function(d){ return (d.month*90 - 15); })
        .attr("y1", function(d){ return (d.supLimit*5); })
        .attr("x2", function(d){ return (d.month*90 + 15); })
        .attr("y2", function(d){ return (d.supLimit*5); })
        .attr("stroke", 'black');
    line4
        .attr("x1", function(d){ return (d.month*90 - 15); })
        .attr("y1", function(d){ return (d.infLimit*5); })
        .attr("x2", function(d){ return (d.month*90 + 15); })
        .attr("y2", function(d){ return (d.infLimit*5); })
        .attr("stroke", 'black');
	}
    

function getInformations(dataset){
	var j = 0
	filteredData = []

	// 12 pairs of data (temperature, month)
	for (var i = 1; i <= 12; i++) {
		data = []
		//go through all the dataset getting the data from the months
		for (; j < dataset.length; j++) {
			if (dataset[j][1] == i){
				data.push(dataset[j][0])
			} else {
				break
			}
		}
		// Get the infos
		if (data.length != 0){
			data.sort(function(a,b) {return a - b;})
			index = data.length-1
			y_max = data[index]
			y_min = data[0]
			info = {
				month : i,
				supLimit : y_max,
				infLimit : y_min,
				fstQuartile : data[7],
				sndQuartile : data[15],
				trdQuartile : data[23]
			}
			filteredData.push(info)
		} 
	};
	return filteredData
}

// Loads the data in different arrays by the year
function separatePerYear(){
	for (var i = 0; i < nbWeather.length; i++){
		if (nbWeather[i].Year == 2013){
			twentythirteen.push(nbWeather[i])
		} else if (nbWeather[i].Year == 2014){
			twentyfourteen.push(nbWeather[i])
		} else if (nbWeather[i].Year == 2015){
			twentyfifteen.push(nbWeather[i])
		} else if (nbWeather[i].Year == 2016){
			twentysixteen.push(nbWeather[i])
		}
	}
}


function getDataset(year, tempType){
	min = []
	med = []
	max = []
	if (year == 2013){
		for (var i = 0; i < twentythirteen.length; i++){
			if (tempType == 'min'){
				min.push([twentythirteen[i].MinTempF, twentythirteen[i].Month])
			} else if (tempType == 'med'){
				med.push([twentythirteen[i].MeanTempF, twentythirteen[i].Month])
			} else if (tempType == 'max'){
				max.push([twentythirteen[i].MaxTempF, twentythirteen[i].Month])
			}
		}
	} else if (year == 2014){
		for (var i = 0; i < twentyfourteen.length; i++){
			if (tempType == 'min'){
				min.push([twentyfourteen[i].MinTempF, twentyfourteen[i].Month])
			} else if (tempType == 'med'){
				med.push([twentyfourteen[i].MeanTempF, twentyfourteen[i].Month])
			} else if (tempType == 'max'){
				max.push([twentyfourteen[i].MaxTempF, twentyfourteen[i].Month])
			}
		}			
	} else if (year == 2015){
		for (var i = 0; i < twentyfifteen.length; i++){
			if (tempType == 'min'){
				min.push([twentyfifteen[i].MinTempF, twentyfifteen[i].Month])
			} else if (tempType == 'med'){
				med.push([twentyfifteen[i].MeanTempF, twentyfifteen[i].Month])
			} else if (tempType == 'max'){
				max.push([twentyfifteen[i].MaxTempF, twentyfifteen[i].Month])
			}
		}
	} else if (year == 2016){
		for (var i = 0; i < twentysixteen.length; i++){
			if (tempType == 'min'){
				min.push([twentysixteen[i].MinTempF, twentysixteen[i].Month])
			} else if (tempType == 'med'){
				med.push([twentysixteen[i].MeanTempF, twentysixteen[i].Month])
			} else if (tempType == 'max'){
				max.push([twentysixteen[i].MaxTempF, twentysixteen[i].Month])
			}
		}
	}

	if (tempType == 'min'){
		return min
	} else if (tempType == 'med'){
		return med
	} else if (tempType == 'max'){
		return max
	}
}

boxPlot(2015, "med")
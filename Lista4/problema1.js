var twentythirteen = []
var twentyfourteen = []
var twentyfifteen = []
var twentysixteen = []
var min = []
var mean = []
var max = []

//Width and height
var margin = {top: 10, right: 30, bottom: 10, left: 20};
var width = 1300 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;


//Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + 0 + "," + 500 + ") scale(" + 1 + "," + -1 + ")")
// Load the data
separatePerYear()

var x = d3.scaleBand().rangeRound(0, width);
var y = d3.scaleLinear().range([height, 0]);

x.domain(data.map(function(d){ return d["Month"];}))
y.domain([tmin*5, tmax*6])

function boxPlot(year, tempType){
	dataset = getDataset(year, tempType)
	filteredData = getInformations(dataset)

	
	var line = d3.select("g").selectAll("line").data(filteredData);
	var rectangles = d3.select("g").selectAll("rect").data(filteredData)

	line.enter().append("line")
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
        
	line.enter().append("line")
        .attr("x1", function(d){ return (d.month*90 - 25); })
        .attr("y1", function(d){ return (d.sndQuartile*5); })
        .attr("x2", function(d){ return (d.month*90 + 25); })
        .attr("y2", function(d){ return (d.sndQuartile*5); })
        .attr("stroke", 'black');   
    

    line.exit().remove();
	rectangles.exit().remove();


	line
        .attr("y1", function(d){ return (d.supLimit*5); })
        .attr("y2", function(d){ return (d.infLimit*5); })
    
    rectangles
        .attr("y", function(d){ return (d.fstQuartile*5); })
        .attr("height", function(d){ return ((d.trdQuartile-d.fstQuartile)*5); });  
        
	line
        .attr("y1", function(d){ return (d.sndQuartile*5); })
        .attr("y2", function(d){ return (d.sndQuartile*5); })
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
		if (data != []){
			data.sort(function(a,b) {return a - b;})
			index = data.length-1
			info = {
				month : i,
				supLimit : data[index],
				infLimit : data[0],
				fstQuartile : data[7],
				sndQuartile : data[15],
				trdQuartile : data[23]
			}
			filteredData.push(info)
		} else {
			filteredData.push([])
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

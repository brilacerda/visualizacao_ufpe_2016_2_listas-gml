var twentythirteen = []
var twentyfourteen = []
var twentyfifteen = []
var twentysixteen = []
var min = []
var mean = []
var max = []

//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


//Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + 0 + "," + -200 + ")");

// Load the data
separatePerYear()

function boxPlot(year, tempType){
	dataset = getDataset(year, tempType)
	filteredData = getInformations(dataset)
	console.log(filteredData)

	d3.select("svg").selectAll("line").data(filteredData).enter().append("line")
        .attr("x1",
            function(d, i){
                return (i*30);
            })
        .attr("y1",
            function(data){
            	console.log(data);
            	return (data[1]);
            })
        .attr("x2",
            function(d, i){
                return (i*30);
            })
        .attr("y2",
            function(data){
            	console.log(data);
            	return (data[2]);
            })     
}

function getInformations(dataset){
	var j = 0
	filteredData = []

	for (var i = 1; i <= 12; i++) {
		data = []
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
			supLimit = data[index]
			infLimit = data[0]
			fstQuartile = data[7]
			sndQuartile = data[15]
			trdQuartile = data[23]
			filteredData.push([supLimit, infLimit, fstQuartile, sndQuartile, trdQuartile])
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
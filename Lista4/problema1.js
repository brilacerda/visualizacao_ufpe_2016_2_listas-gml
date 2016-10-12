var twentythirteen = []
var twentyfourteen = []
var twentyfifteen = []
var twentysixteen = []
var min = []
var mean = []
var max = []

function main(){
	separatePerYear()
}

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
				min.push(twentythirteen[i].MinTempF)
			} else if (tempType == 'med'){
				med.push(twentythirteen[i].MeanTempF)
			} else if (tempType == 'max'){
				max.push(twentythirteen[i].MaxTempF)
			}
		}
	} else if (year == 2014){
		for (var i = 0; i < twentyfourteen.length; i++){
			if (tempType == 'min'){
				min.push(twentyfourteen[i].MinTempF)
			} else if (tempType == 'med'){
				med.push(twentyfourteen[i].MeanTempF)
			} else if (tempType == 'max'){
				max.push(twentyfourteen[i].MaxTempF)
			}
		}			
	} else if (year == 2015){
		for (var i = 0; i < twentyfifteen.length; i++){
			if (tempType == 'min'){
				min.push(twentyfifteen[i].MinTempF)
			} else if (tempType == 'med'){
				med.push(twentyfifteen[i].MeanTempF)
			} else if (tempType == 'max'){
				max.push(twentyfifteen[i].MaxTempF)
			}
		}
	} else if (year == 2016){
		for (var i = 0; i < twentysixteen.length; i++){
			if (tempType == 'min'){
				min.push(twentysixteen[i].MinTempF)
			} else if (tempType == 'med'){
				med.push(twentysixteen[i].MeanTempF)
			} else if (tempType == 'max'){
				max.push(twentysixteen[i].MaxTempF)
			}
		}
	}

	if (tempType == 'min'){
		return min.sort()
	} else if (tempType == 'med'){
		return med.sort()
	} else if (tempType == 'max'){
		return max.sort()
	}
}
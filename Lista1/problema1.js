//filter the data by the specie an return an array 
// containing the characteristics values
function getData(iris, specie, charac){
	var dataset=[];
	var index = 0
	for (var i in iris){
		if (iris[i].Species == specie){
		    dataset[index] = iris[i][charac];
			index++;
		}
	}
	return dataset;
}

// get the minimum number of an array
function getMinimum(iris, specie, charac){
	dataset = getData(iris, specie, charac);
	console.log(dataset)
	minimum = dataset.reduce(function(a, b) {
	  if(a < b)
	    return a;
	  else 
	    return b;
	})
	return minimum;
}

// get the average of a number array
function getAverage(iris, specie, charac){
	dataset = getData(iris, specie, charac);

	if (dataset.length > 1) {
		sum = dataset.reduce(function(a, b){
		   return a + b;
        });
	    avg = sum/dataset.length;
    } else
    	avg = 0;

    console.log(avg);
    return avg
}

// given the column name and a species list returns the biggest value to the 
// individual of a non-listed species.
function getMaximumNotIn(iris, column, unwantedSpecies){
	var filtered = iris.filter(function(plant){
	for (var i in unwantedSpecies){
	    if (unwantedSpecies[i] == plant.Species)
            return false
    }
    return true
	})
	console.log(filtered)

	for (i in filtered){
		dataset[i] = filtered[i][column];
	}
    console.log(dataset)

    maximumNotIn = dataset.reduce(function(a, b){
        if (a > b)
            return a
        else
            return b
    })
    console.log(maximumNotIn)
}
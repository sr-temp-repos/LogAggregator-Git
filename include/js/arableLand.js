/*Import nessary API*/
var fs = require("fs");
var readline = require("readline");

/*Initialize values*/
var fileName = new Array("../../Feed/WDI_Data.csv", "../../Feed/Countries-Continents.csv");
var indiaPercentLand = {},
    indiaHectPerPerson = {},
    indiaHectares = {},
    africaPercentLand = {},
    continentHectares = {},
    country = {};
var title = [],
    continent = [];
var rlMain, rlLookup, years, index, temp;

/*Formmating data in object for D3 js*/
function values(obj) {
    var vals = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            vals.push(obj[key]);
        }
    }
    return vals;
}

/*Calling the function*/
lookupProcessor();

/*lookupProcessor funtion to create lookup dictionary*/
function lookupProcessor() {
    var lookup = fs.createReadStream(fileName[1]);
    rlLookup = readline.createInterface({
        input: lookup
    });
    /*Read each line*/
    rlLookup.on('line', function(data) {
        index = 0;
        temp = data.split(",");
        if (temp[0] == "Continent") {
            index = 1;
        }
        /*Creating key value pair for lookup*/
        if (temp !== '' && index === 0) {
            if (country[temp[1]] === undefined) {
                country[temp[1]] = temp[0];
            }
        }
    });
    /*Calling csvProcessor on the completion of lookup dictionary*/
    rlLookup.on('close', function() {
        csvProcessor();
    });
}

/*Function to process CSV and populate Array*/
function csvProcessor() {
    /*Passing file name to csvProcessor*/
    var inputs = fs.createReadStream(fileName[0]);
    rlMain = readline.createInterface({
        input: inputs
    });
    /*Check if file exists*/
    rlMain.on('line', function(line) {
        index = 0;
        temp = line.split(",");
        /*Selecting the first line*/
        if (temp[0] == "countryName") {
            title = temp;
            index = 1;
        }
        /*JSON for India - Arable land (% of land area)*/
        if (temp !== '' && index === 0) {
            /*Criteria to opulating Agewise data*/
            if (temp[0] == "India" && temp[2] == "Arable land (% of land area)") {
                for (i = 4; i <= 59; i++) {
                    if (temp[i] !== '' && indiaPercentLand[title[i]] === undefined) {
                        years = title[i];
                        indiaPercentLand[years] = {
                            year: years,
                            percent: parseFloat(temp[i])
                        };
                    }
                }
            }
            /*JSON for India - Arable land (hectares per person)*/
            if (temp[0] == "India" && temp[2] == "Arable land (hectares per person)") {
                for (i = 4; i <= 59; i++) {
                    if (temp[i] !== '' && indiaHectPerPerson[title[i]] === undefined) {
                        years = title[i];
                        indiaHectPerPerson[years] = {
                            year: years,
                            percent: parseFloat(temp[i])
                        };
                    }
                }
            }
            /*JSON for India - Arable land (hectares)*/
            if (temp[0] == "India" && temp[2] == "Arable land (hectares)") {
                for (i = 4; i <= 59; i++) {
                    if (temp[i] !== '' && indiaHectares[title[i]] === undefined) {
                        years = title[i];
                        indiaHectares[years] = {
                            year: years,
                            total: parseFloat(temp[i])
                        };
                    }
                }
            }
            /*JSON for Africa - Arable land (% of land area)*/
            if (country[temp[0]] == "Africa" && temp[2] == "Arable land (% of land area)") {
                if (temp[54] !== '' && title[54] == "2010") {
                    var tempCountry = temp[0];
                    africaPercentLand[tempCountry] = {
                        countryName: tempCountry,
                        total: parseFloat(temp[54])
                    };
                }
            }
            /*JSON for Continent-Wise : Arable land (hectares)*/
            if (temp[2] == "Arable land (hectares)") {
                var tempContinent = country[temp[0]];
                for (i = 4; i <= 59; i++) {
                    years = title[i];
                    if (temp[i] !== '' && tempContinent !== undefined) {
                        if (continentHectares[years]) {
                            var record = continentHectares[years];
                            var value = record[tempContinent] || 0;
                            record[tempContinent] = value + parseFloat(temp[i]);
                        } else {
                            var object = {};
                            object.year = years;
                            object[tempContinent] = parseFloat(temp[i]);
                            continentHectares[years] = object;
                        }
                    }
                }
            }
        }
    });
    
    /*Writing into the JSON files*/
    rlMain.on('close', function() {
        fs.writeFile('../../Feed/continentHectares.json', JSON.stringify(values(continentHectares),null,'\t'));
        fs.writeFile('../../Feed/africaPercentLand.json', JSON.stringify(values(africaPercentLand),null,'\t'));
        fs.writeFile('../../Feed/indiaPercentLand.json', JSON.stringify(values(indiaPercentLand),null,'\t'));
        fs.writeFile('../../Feed/indiaHectPerPerson.json', JSON.stringify(values(indiaHectPerPerson),null,'\t'));
        fs.writeFile('../../Feed/indiaHectares.json', JSON.stringify(values(indiaHectares),null,'\t'));
    });
}

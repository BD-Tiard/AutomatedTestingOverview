var chartContext = document.getElementById("ChartCanvas").getContext("2d");

var createdChart;
var chartAlreadyCreated = false;

var dateTimeOfTest = [];
var quoteOpeningTime = [];
var alhCalculationTime = [];
var waterSupplyCalculationTime = [];
var lightingCalculationTime = [];
var winterGardenCalculationTime = [];
var feedStorageCalculationTime = [];
var climateCalculationTime = [];
var manureBeltVentilationCalculationTime = [];
var crossManureRemovalCalculationTime = [];
var priceCalculationTime = [];

function addUploadListener() {
    // import data from excel file
    document.getElementById('upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the first sheet contains the data
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Parse the sheet to JSON
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);

            // Extract the lists
            // Test Started Time
            var dateTimeOfTest_Excel = json.map(row => row['Started']);
            dateTimeOfTest = dateTimeOfTest_Excel.map(convertExcelDateToJSDate);
            console.log(dateTimeOfTest);
            // Quote Opening Time
            var quoteOpeningTime_Excel = json.map(row => row['QuoteOpening']);
            quoteOpeningTime = convertExcelToSeconds(quoteOpeningTime_Excel);
            // ALH Calculation Time
            var alhCalculationTime_Excel = json.map(row => row['ALH_Calculation']);
            alhCalculationTime = convertExcelToSeconds(alhCalculationTime_Excel);
            // Water Supply Calculation Time
            var waterSupplyCalculationTime_Excel = json.map(row => row['WaterSupplyCalculation']);
            waterSupplyCalculationTime = convertExcelToSeconds(waterSupplyCalculationTime_Excel);
            // Lighting Calculation Time
            var lightingCalculationTime_Excel = json.map(row => row['LightingCalculation']);
            lightingCalculationTime = convertExcelToSeconds(lightingCalculationTime_Excel);
            // Wintergarden Calculation Time
            var winterGardenCalculationTime_Excel = json.map(row => row['WinterGardenCalculation']);
            winterGardenCalculationTime = convertExcelToSeconds(winterGardenCalculationTime_Excel);
            // Feed Storage Time
            var feedStorageCalculationTime_Excel = json.map(row => row['FeedStorageCalculation']);
            feedStorageCalculationTime = convertExcelToSeconds(feedStorageCalculationTime_Excel);
            // Climate Calculation Time
            var climateCalculationTime_Excel = json.map(row => row['ClimateCalculation']);
            climateCalculationTime = convertExcelToSeconds(climateCalculationTime_Excel);
            // Manure Belt Ventilation Calculation Time
            var manureBeltVentilationCalculationTime_Excel = json.map(row => row['ManureBeltCalculation']);
            manureBeltVentilationCalculationTime = convertExcelToSeconds(manureBeltVentilationCalculationTime_Excel);
            // Manure Belt Ventilation Calculation Time
            var crossManureRemovalCalculationTime_Excel = json.map(row => row['CrossManureRemovalCalculation']);
            crossManureRemovalCalculationTime = convertExcelToSeconds(crossManureRemovalCalculationTime_Excel);
            // Price Calculation Time
            var priceCalculationTime_Excel = json.map(row => row['PriceCalculation']);
            priceCalculationTime = convertExcelToSeconds(priceCalculationTime_Excel);
            //
            updateChart();
        };

        reader.readAsArrayBuffer(file);
    });
}

function getLabels(startIndex) {
    return dateTimeOfTest.slice(startIndex);
}

function getData(startIndex) {
    return {
        labels: getLabels(),
        datasets: [
            {
                data: quoteOpeningTime.slice(startIndex),
                label: "Quote Opening",
                backgroundColor: 'rgb(255, 163, 0)',
                borderColor: 'rgb(255, 163, 0)',
                //yAxisID: 'seconds',
            },
            {
                data: alhCalculationTime.slice(startIndex),
                label: "ALH Calculation",
                backgroundColor: 'rgb(221, 87, 28)',
                borderColor: 'rgb(221, 87, 28)',
                //yAxisID: 'seconds',
            },
            {
                data: waterSupplyCalculationTime.slice(startIndex),
                label: "Water Supply Calculation",
                backgroundColor: 'rgb(64, 160, 255)',
                borderColor: 'rgb(64, 160, 255)',
                //yAxisID: 'seconds',
            },
            {
                data: lightingCalculationTime.slice(startIndex),
                label: "Lighting Calculation",
                backgroundColor: 'rgb(211, 211, 211)',
                borderColor: 'rgb(211, 211, 211)',
                //yAxisID: 'seconds',
            },
            {
                data: winterGardenCalculationTime.slice(startIndex),
                label: "Wintergarden Calculation",
                backgroundColor: 'rgb(173, 216, 230)',
                borderColor: 'rgb(173, 216, 230)',
                //yAxisID: 'seconds',
            },
            {
                data: feedStorageCalculationTime.slice(startIndex),
                label: "Feed Storage Calculation",
                backgroundColor: 'rgb(144, 238, 144)',
                borderColor: 'rgb(144, 238, 144)',
                //yAxisID: 'seconds',
            },
            {
                data: climateCalculationTime.slice(startIndex),
                label: "Climate Calculation",
                backgroundColor: 'rgb(216, 36, 41)',
                borderColor: 'rgb(216, 36, 41)',
                //yAxisID: 'seconds',
            },
            {
                data: manureBeltVentilationCalculationTime.slice(startIndex),
                label: "Manure Belt Ventilation Calculation",
                backgroundColor: 'rgb(216, 36, 41)',
                borderColor: 'rgb(216, 36, 41)',
                //yAxisID: 'seconds',
            },
            {
                data: crossManureRemovalCalculationTime.slice(startIndex),
                label: "Cross Manure Removal Calculation",
                backgroundColor: 'rgb(216, 36, 41)',
                borderColor: 'rgb(216, 36, 41)',
                //yAxisID: 'seconds',
            },
            {
                data: priceCalculationTime.slice(startIndex),
                label: "Price Calculation",
                backgroundColor: 'rgb(216, 36, 41)',
                borderColor: 'rgb(216, 36, 41)',
                //yAxisID: 'seconds',
            }
        ]
    }
}

function createChart() {

    var startTime = calculateStartTime();
    // Find the index of the first entry after the start Date of the time window
    var startIndex = dateTimeOfTest.findIndex(date => date >= startTime);

    const config = {
        type: "line",
        data: getData(),
        options: {
            scales: {
                y: {
                    type: 'linear', // Specify a valid scale type
                    position: 'right', // Position on the chart
                    suggestedMin: 0,
                    suggestedMax: 60,
                    ticks: {
                        callback: function (value) {
                            return value + 's'; // Add 's' for seconds to tick labels
                        }
                    }
                },
                x: {
                    type: 'time', // Use time scale for x-axis
                    time: {
                        unit: 'day' // Adjust time unit (e.g., 'day', 'month', 'hour', etc.)
                    },
                    ticks: {
                        source: 'labels', // Ensure ticks align with your labels
                        autoSkip: true, // Dynamically skip ticks if they overlap
                        maxRotation: 45, // Maximum rotation for tick labels
                        minRotation: 0   // Minimum rotation for tick labels
                    },
                    title: {
                        display: true,
                        text: 'Dates'
                    }
                }
            }
        }
    };

    //console.log(config);
    createdChart = new Chart(chartContext, config); //create the chart in the chartContext canvas with the config done above
}

function updateChart() //create a new dataset
{
    if (!chartAlreadyCreated) {
        createChart();
        chartAlreadyCreated = true;
        return;
    }
    var startTime = calculateStartTime();
    // Find the index of the first entry after the start Date of the time window
    var startIndex = dateTimeOfTest.findIndex(date => date >= startTime);
    createdChart.config.data = getData(startIndex); //replace the old data in the config object
    createdChart.update(); //update the chart
}

function convertExcelDateToJSDate(excelDate) {
    const excelEpoch = new Date(1900, 0, 1);
    return new Date(excelEpoch.getTime() + (excelDate - 1) * 86400 * 1000);
}

function convertExcelToSeconds(excelTime) {
    return excelTime.map(entry => {
        if (typeof entry !== "number" || isNaN(entry)) {
            console.warn("Invalid time entry:", entry);
            return 0; // Default to 0 seconds for invalid or missing entries
        }

        // Convert the decimal part of the Excel time to seconds (multiplied by 1440 (still don't get why its 1440))
        return entry * 1440;
    });
}

function calculateStartTime() {
    timeWindow = "last year";
    const startTime = new Date(); // Current date and time
    switch (timeWindow) {
        case "last 24h":
            startTime.setDate(startTime.getDate() - 1); // Subtract 1 day
            break;
        case "last month":
            startTime.setMonth(startTime.getMonth() - 1); // Subtract 1 month
            break;
        case "last year":
            startTime.setFullYear(startTime.getFullYear() - 1); // Subtract 1 year
            break;
        case "all time":
            return new Date(2000, 0, 1, 0, 0, 0, 0); // January 1, 2000, at 00:00
        default:
            console.warn("Invalid time window specified, using the current time.");
            return startTime; // Default to current time if invalid input
    }
    return startTime;
}
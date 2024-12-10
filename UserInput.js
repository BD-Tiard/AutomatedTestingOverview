var timeWindow;
var winterTime;

function update() {
    // Get the value of the timeWindow number input (e.g., last year, last month, etc.)
    timeWindow = document.getElementById('timeWindow').value;
    // Get the checked state of the winterTime checkbox
    winterTime = document.getElementById('winterTime').checked;
    updateChart();
}

function copyDataFilePath() {
    // Specify the file path you want to copy
    var filePath = "C:\\Users\\Username\\Documents\\YourExcelFile.xlsx";  // Replace with the actual file path

    // Create a temporary textarea element to copy the file path to the clipboard
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = filePath;
    document.body.appendChild(tempTextArea);

    // Select the text and copy it to the clipboard
    tempTextArea.select();
    document.execCommand('copy');

    // Remove the temporary textarea after copying
    document.body.removeChild(tempTextArea);

    // Optionally, show an alert or notification to confirm that the file path was copied
    alert("File path copied to clipboard!");
}
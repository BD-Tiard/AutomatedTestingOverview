var timeWindow;
var winterTime;

function update() {
    // Get the value of the timeWindow number input (e.g., last year, last month, etc.)
    timeWindow = document.getElementById('timeWindow').value;
    // Get the checked state of the winterTime checkbox
    winterTime = document.getElementById('winterTime').checked;
    updateChart();
}
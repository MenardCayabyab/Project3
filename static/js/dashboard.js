const chartContainer = document.getElementById('chart-container');
const dataSelector = document.getElementById('data-selector');

// Initialize the chart
let chart = new Chart(chartContainer, {
    type: 'bar',
    data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            label: 'Data',
            data: [0, 0, 0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Update the chart when the data selector changes
dataSelector.addEventListener('change', () => {
    const selectedData = dataSelector.value;
    
    // Retrieve the data for the selected option from the server
    fetch(`/data/${selectedData}`)
        .then(response => response.json())
        .then(data => {
            // Update the chart data and labels
            chart.data.labels = data.labels;
            chart.data.datasets[0].data = data.values;
            chart.update();
        });
});
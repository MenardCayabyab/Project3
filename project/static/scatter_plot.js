function drawScatterPlot(data) {
    // Clear the scatter plot container
    const container = document.getElementById('scatter-plot');
    container.innerHTML = '';
  
    // Set up the dimensions for the scatter plot
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
    // Create an SVG element to hold the scatter plot
    const svg = d3.select('#scatter-plot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Set up the scales for the scatter plot
    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.time_period), d3.max(data, d => d.time_period)])
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([height, 0]);
  
    // Add the x-axis to the scatter plot
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    // Add the y-axis to the scatter plot
    svg.append('g')
      .call(d3.axisLeft(y));
  
    // Add the data points to the scatter plot
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.time_period))
      .attr('cy', d => y(d.count))
      .attr('r', 4)
      .style('fill', '#69b3a2');
  }

  function updateScatterPlot() {
    const timeFilter = document.getElementById('time_filter').value;
    fetch('/scatter_plot_data?time_filter=' + timeFilter)
      .then(response => response.json())
      .then(result => {
        const scatterPlotData = result.scatter_plot_data;
        drawScatterPlot(scatterPlotData);
      });
}

document.addEventListener('DOMContentLoaded', function () {
    const initialScatterPlotData = window.scatterPlotData;
    drawScatterPlot(initialScatterPlotData);
});

  
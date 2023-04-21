function renderChart(outcomeTypesDistribution) {
  // Create an SVG element for the bar chart
  const svg = d3.select("#outcome-types-chart") // Selects the 'outcome-types-chart' element from the HTML document
    .append("svg") // Appends a new 'svg' element to the selected element
    .attr("width", 600) // Sets the width of the 'svg' element to 600 pixels
    .attr("height", 300); // Sets the height of the 'svg' element to 300 pixels

  // Create x and y scales
  const x = d3.scaleBand() // Creates a new band scale for the x-axis
    .domain(Object.keys(outcomeTypesDistribution)) // Sets the domain of the scale to the keys of the 'outcomeTypesDistribution' object
    .range([0, 600]) // Sets the range of the scale to [0, 600] pixels
    .padding(0.1); // Sets the padding between the bars to 0.1 times the width of each bar

  const y = d3.scaleLinear() // Creates a new linear scale for the y-axis
    .domain([0, d3.max(Object.values(outcomeTypesDistribution))]) // Sets the domain of the scale to [0, max value of the 'outcomeTypesDistribution' object]
    .range([300, 0]); // Sets the range of the scale to [300, 0] pixels

  // Create and append the bars
  svg.selectAll(".bar") // Selects all elements with class 'bar' in the 'svg' element
    .data(Object.entries(outcomeTypesDistribution)) // Binds the data to the selected elements
    .enter().append("rect") // Creates a new 'rect' element for each data point that doesn't have a corresponding element
    .attr("class", "bar") // Sets the class of the 'rect' element to 'bar'
    .attr("x", d => x(d[0])) // Sets the x-coordinate of the top-left corner of the 'rect' element to the corresponding value on the x-scale
    .attr("y", d => y(d[1])) // Sets the y-coordinate of the top-left corner of the 'rect' element to the corresponding value on the y-scale
    .attr("width", x.bandwidth()) // Sets the width of the 'rect' element to the width of each bar on the x-scale
    .attr("height", d => 300 - y(d[1])) // Sets the height of the 'rect' element to the difference between the height of the 'svg' element and the corresponding value on the y-scale
    .attr("fill", "steelblue"); // Sets the fill color of the 'rect' element to steelblue

  // Create and append the x-axis
  svg.append("g") // Appends a new 'g' element to the 'svg' element
    .attr("transform", "translate(0," + 300 + ")") // Translates the x-axis to the bottom of the 'svg' element
    .call(d3.axisBottom(x)); // Calls the d3.axisBottom() function to create the x-axis

  // Create and append the y-axis
  svg.append("g") // Appends a new 'g' element to the 'svg' element
    .call(d3.axisLeft(y)); // Calls the d3.axisLeft() function to create the y-axis
}

renderChart({{ outcome_types_distribution | tojson }}); // Calls the renderChart() function

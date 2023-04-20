function renderChart(outcomeTypesDistribution) {
  // Create an SVG element for the bar chart
  const svg = d3.select("#outcome-types-chart")
    .append("svg")
    .attr("width", 600)
    .attr("height", 300);

  // Create x and y scales
  const x = d3.scaleBand()
    .domain(Object.keys(outcomeTypesDistribution))
    .range([0, 600])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(Object.values(outcomeTypesDistribution))])
    .range([300, 0]);

  // Create and append the bars
  svg.selectAll(".bar")
    .data(Object.entries(outcomeTypesDistribution))
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d[1]))
    .attr("width", x.bandwidth())
    .attr("height", d => 300 - y(d[1]))
    .attr("fill", "steelblue");

  // Create and append the x-axis
  svg.append("g")
    .attr("transform", "translate(0," + 300 + ")")
    .call(d3.axisBottom(x));

  // Create and append the y-axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
renderChart({{ outcome_types_distribution | tojson }});

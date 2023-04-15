// Define the URL for the JSON data
const url = "https://data.sonomacounty.ca.gov/api/views/924a-vesw/rows.json?accessType=DOWNLOAD";

// Use the d3.json() method to retrieve the data from the URL
d3.json(url)
  .then(function(data) {
    console.log(data);
    init(data); // Call the init function and pass in the data
  });

function init(data) {
  // Parse the data and create the necessary data structures
  const animalIds = data.data.map(row => row[17]); // Get a list of animal IDs from the data

  // Create the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  animalIds.forEach(function(id) {
    dropdownMenu.append("option")
    .text(id)
    .attr("value", id);
  });

  // Initializing the variable sample_one having the first elementof the names array.
  let animal_one = animalIds[0];
  // Logging to the console for debugging purposes later on.
  console.log(animal_one);
  // Building our first chart for first animal
  buildMetadata(animal_one);
  buildBarChart(animal_one);
  buildBubbleChart(animal_one);
  buildGaugeChart(animal_one);
};

function buildMetadata(sample) {
  d3.json(url).then((data) => {
      let metadata = data.data;
      let labels = data.meta.view.columns.map((column) => column.name); // get labels from the metadata
      let result = metadata.filter((row) => row[17] == sample)[0]; // find the row with the given sample ID
      let keyValuePairs = labels.map((label, index) => [label, result[index]]); // create key-value pairs
      let metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html(""); // clear the panel
      keyValuePairs.forEach((pair) => {
          metadataPanel.append("h5").text(`${pair[0]}: ${pair[1]}`); // add the label-value pairs as headings
      });
  });
};



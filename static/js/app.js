// Define the URL for the JSON data
const url = "https://data.sonomacounty.ca.gov/api/views/924a-vesw/rows.json?accessType=DOWNLOAD";

// Use the d3.json() method to retrieve the data from the URL
d3.json(url).then(function(data) {
    console.log(data); // Log the data to the console for debugging purposes
    init(data); // Call the init function and pass in the data
});

function init(data) {
    // Parse the data and create the necessary data structures
    const animalIds = data.data.map(row => row[17]); // Get a list of animal IDs from the data

    // Create the dropdown menu
    let dropdownMenu = d3.select("#selDataset"); // Select the dropdown menu element using its ID
    animalIds.forEach(function(id) { // Loop through each animal ID and add an option element to the dropdown menu
        dropdownMenu.append("option")
        .text(id)
        .attr("value", id); // Set the value of each option to the corresponding animal ID
    });

    // Initializing the variable animal_one having the first element of the animalIds array.
    let animal_one = animalIds[0];
    // Logging to the console for debugging purposes later on.
    console.log(animal_one);
    // Building our first chart for first animal
    buildMetadata(animal_one);
    buildBarChart(animal_one);
    buildBubbleChart(animal_one);
    buildGaugeChart(animal_one);

    // Add an event listener to the dropdown menu that listens for changes in the selected option
    dropdownMenu.on("change",function() {
        let selectedAnimal = d3.select(this).property("value");

        buildMetadata(selectedAnimal); // Rebuild the metadata panel with the data for the selected animal
        buildBarChart(selectedAnimal); // Rebuild the bar chart with the data for the selected animal
        buildBubbleChart(selectedAnimal); // Rebuild the bubble chart with the data for the selected animal
        buildGaugeChart(selectedAnimal); // Rebuild the gauge chart with the data for the selected animal
    });
};

function buildMetadata(sample) {
    d3.json(url).then((data) => {
        let metadata = data.data; // Get the metadata from the data
        let labels = data.meta.view.columns.map((column) => column.name); // Get the labels for the metadata from the data
        let result = metadata.filter((row) => row[17] == sample)[0]; // Filter the metadata to find the row with the given animal ID
        let keyValuePairs = labels.map((label, index) => [label, result[index]]); // Create key-value pairs from the labels and data for the selected animal
        let metadataPanel = d3.select("#sample-metadata"); // Select the metadata panel using its ID
        metadataPanel.html(""); // Clear the metadata panel
        keyValuePairs.forEach((pair) => {
            metadataPanel.append("h5").text(`${pair[0]}: ${pair[1]}`); // Add the label-value pairs as headings to the metadata panel
        });
    });
};

function optionChanged(value) {

  console.log(value);
  
  // Calling all our functions.
  buildMetadata(value);
  buildBarChart(value);
  buildBubbleChart(value);
  buildGaugeChart(value);
};



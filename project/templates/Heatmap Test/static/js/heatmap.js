let myMap = L.map("map", {
    center: [38.486150, -122.837814],
    zoom: 7
  });
  
  // Let's put the URL and attribution info as variables lol.
  var OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  var OSM_attrb = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  
  // Adding the tile layer
  L.tileLayer(OSM_URL, {
      attribution: OSM_attrb
  }).addTo(myMap);

let URL = "https://data.sonomacounty.ca.gov/resource/924a-vesw.json"

// How many data points am I feeding in??
// We should divide it up... perhaps by year/month? 
// Or maybe just from the previous year?
// We'll have to look for similar heatmaps...

// ... Does it have to be a heatmap?
// We could just put up markers instead.
// Color-code them by animal type?

d3.json(URL).then(function(response){

    console.log(response)
    resp = response;

    let heatArray = [];

    for (let i = 0; i < 500; i++) {
        let animal_loc = resp[i].location;
        if (animal_loc) {
            console.log(animal_loc);
            heatArray.push([animal_loc.latitude, animal_loc.longitude]);
        }
    }

    let heat = L.heatLayer(heatArray, {
        radius: 35,
        blur: 10
    }).addTo(myMap);

});
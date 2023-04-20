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

d3.json(URL).then(function(response){

    console.log(response)
    features = response.features;

    let heatArray = [];

    for (let i = 0; i < response.length; i++) {
        let animal = features[i];
        if (animal) {
            console.log(animal);
            heatArray.push([animal.location.latitude, animal.location.longitude]);
        }
    }

    let heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);

});
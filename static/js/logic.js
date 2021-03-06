var map = L.map("map", {
  center: [37, -95],
  zoom: 4,
  attributionControl: false
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(map);





d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(response) {
  var earthquakes = response.features;
  console.log(earthquakes)

    for (var index = 0; index < earthquakes.length; index++) {
      var color = "";
        if (earthquakes[index].properties.mag > 90) {
          // color = "red";
          color = "rgb(255,0,0)";
        }
        else if (earthquakes[index].properties.mag > 70) {
          // color = "orange";
          color = "rgb(225,100,0)";
        }
        else if (earthquakes[index].properties.mag > 50) {
          // color = "rgb(255,218,185)";
          color = "rgb(200,200,0)";
        }
        else if (earthquakes[index].properties.mag > 30) {
          // color = "lightblue";
          color = "rgb(255,255,0)";
        }
        else if (earthquakes[index].properties.mag > 10) {
          // color = "yellow";
          color = "rgb(150,255,0)";
        }
        else {
          color = "green";
        }


    var earthquake = earthquakes[index].geometry.coordinates;
    L.circleMarker([earthquake[0], earthquake[1]], {
      fillOpacity: 0.75,
      colorOpacity: 0.75,
      color: color,
      fillColor: color,
      weight: 0.5,
      radius: earthquakes[index].properties.mag * 2 })
      .bindPopup("<h2> Location: " + earthquakes[index].properties.place + "</h2> <hr> <h3> Depth: " + earthquakes[index].geometry.coordinates[2] + "</h3> <h3> Magnitude: " + earthquakes[index].properties.mag + "</h3> <h3> Date: " + new Date(earthquakes[index].properties.time) +  "</h3>").addTo(map);


      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: rgb(0,255,0)"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background: rgb(150,255,0)"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: rgb(255,255,0)"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: rgb(200,200,0)"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: rgb(225,100,0)"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: rgb(255,0,0)"></i><span>90+</span><br>';

        return div;
      };

      legend.addTo(map);}})

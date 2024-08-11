//map initialization
var map = L.map('map').setView([20.9451, 74.7251], 13);
map.zoomControl.setPosition('topright')
//***********************************************************************************************
//tile layers:
var osm= L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

osm.addTo(map)
//***********************************************************************************************

//adding marker
var marker=L.marker([20.9451, 74.7251]);
var markerinfo=marker.bindPopup("Gondur" + " " +marker.getLatLng()	).openPopup();

markerinfo.addTo(map)
//***********************************************************************************************

//get geoJson of the marker
var geoJson = marker.toGeoJSON()
console.log(geoJson);
//***********************************************************************************************
// // Add wms layer to map
// var layer1 = L.tileLayer.betterWms("http://localhost:8080/geoserver/wms", {
//   layers: "GIS:Gondur_GutNo_SurveyNo2",
//   format: "image/png",
//   transparent: true,
//   attribution: "mylayer",
//  });
//  var shp=layer1.addTo(map);


//  var layer2 = L.tileLayer.betterWms("http://localhost:8080/geoserver/wms", {
//   layers: "	GIS:Village_Boundary",
  
//   format: "image/png",
//   transparent: true,
//   attribution: "mylayer",

//  },
 
// );
//  var shp=layer2.addTo(map);
 //**********************************************************************************************


 // Shapefile to leaflet
var shpfile1 = new L.Shapefile('libs/Gondur_GutNo_SurveyNo2.zip', {
  layers: "GIS:Gondur_GutNo_SurveyNo2",
  format: "image/png",
  transparent: true,
  attribution: "mylayer",
  style: {
    color: "Black",
    fillOpacity: "1",
    fillColor: "Brown",
  },

  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
      <div class="popup-content">
        <h3><b>Survey Number:</b> ${feature.properties.id}</h3>
        <p><b>Owner Information:</b> ${feature.properties.Owner_Info}</p>
      </div>
    `);
  },


});

var shp1=shpfile1.addTo(map);




var shpfile2 = new L.Shapefile('libs/Village_Boundary.zip', {
  layers: "GIS:Gondur_GutNo_SurveyNo2",
  format: "image/png",
  transparent: true,
  attribution: "mylayer",
  style: {
    color: "Black",
    fillOpacity: "1",
    fillColor: "yellow",
  },

  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
      <div class="popup-content">
        <h3><b>CCODEr:</b> ${feature.properties.CCODE}</h3>
        <p><b> Village Name:</b> ${feature.properties.NAME}</p>
        <p><b>Village Code:</b> ${feature.properties.VIL_CD}</p>
        <p><b>Taluka Name:</b> ${feature.properties.T_NAME}</p>
        <p><b>Taluka Code:</b> ${feature.properties.T_CODE}</p>
        <p><b>District Name:</b> ${feature.properties.D_NAME}</p>
        <p><b>District Code:</b> ${feature.properties.D_CODE}</p>
        <p><b>Total Area in hectres:</b> ${feature.properties.Shape_Area}</p>

      </div>
    `);
  },
});

var shp=shpfile2.addTo(map);
 //**********************************************************************************************


//Layer Controller To switch the base map
var layers={
  "osm":osm,
  "googleStreets":googleStreets,
  "googleHybrid":googleHybrid,
  "googleSat":googleSat,
  "googleSat":googleSat,
  "googleTerrain":googleTerrain
}

var overlays={
  "marker":marker,
//   "Village Boundary" :layer2,
//  "My Village 7/12":layer1,
 "Village 7/12":shpfile1,
 "Village_Boundary":shpfile2
 
}


 //**********************************************************************************************




// var wfsLayer = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs", {
//   layers: "GIS:Gondur_GutNo_SurveyNo2",
//   style: {
//     color: "none",
//     fillOpacity: "0.5",
//     fillColor: "red",
//   },

//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(`
//       <div class="popup-content">
//         <h3><b>Survey Number:</b> ${feature.properties.id}</h3>
//         <p><b>Owner Information:</b> ${feature.properties.Owner_Name}</p>
//       </div>
//     `);
//   },
// });

// wfsLayer.addTo(map);

 //**********************************************************************************************


 var allLayer=L.control.layers(layers,overlays, {collapsed :false , position:'topleft'})
 allLayer.addTo(map);
 //**********************************************************************************************
//Add scale to map
L.control.scale({position:'bottomright'}).addTo(map)

//***********************************************************************************************
//view map fullscreen
var mapID= document.getElementById('map')
function FullScreenView ()
{
  mapID.requestFullscreen();
}
//***********************************************************************************************
//Display Coordinate on movemovement for this we use JQueery CDN
var coordinateEle=document.getElementById("coordinate");

map.on('mousemove', function(e){
  //console.log(e);
  $('.coordinate').html(`Lat :${e.latlng.lat}  ,  Long :${e.latlng.lng}`)
})

//***********************************************************************************************
//Geocoding

var featureSelect = document.getElementById('featureSelect');
        var featureLayers = {};

        shp1.once('data:loaded', function() {
          shp1.eachLayer(function(layer) {
                var featureId = layer.feature.properties.id ; // Adjust property name as needed
                if (featureId) {
                    var option = document.createElement('option');
                    option.value = featureId;
                    option.text = featureId;
                    featureSelect.add(option);

                    // Store the layer for later access
                    featureLayers[featureId] = layer;
                }
            });

            // Handle dropdown selection
            featureSelect.addEventListener('change', function() {
                var selectedId = this.value;

                // Clear previous highlight
                shp1.eachLayer(function(layer) {
                    layer.setStyle({ color: 'Black', weight: 2 }); // Default style
                });

                if (selectedId) {
                    var selectedLayer = featureLayers[selectedId];
                    if (selectedLayer) {
                        selectedLayer.setStyle({ color: 'White', weight: 10 }); // Highlight style
                        map.fitBounds(selectedLayer.getBounds()); // Zoom to the selected feature
                    } else {
                        console.warn('Selected layer not found for ID:', selectedId);
                    }
                }
            });
        });
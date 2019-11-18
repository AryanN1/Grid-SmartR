// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = "block";
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

/* Script for the Map */
var platform = new H.service.Platform({
  apikey: "fEt0rdhSaOsl-IdplRq33SxpZQDIkczd8d5MUmp1hTI"
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById("mapContainer"),
  maptypes.vector.normal.map,
  {
    zoom: 10,
    center: { lng: -118, lat: 34 }
  }
);

let mapevents = new H.mapevents.MapEvents(map),
  behavior = new H.mapevents.Behavior(mapevents);
let startY,
  endY = 0;
map.addEventListener("dragstart", function(evt) {
  if (evt.currentPointer.type == "touch" && evt.pointers.length < 2) {
    startY = evt.currentPointer.viewportY;
    behavior.disable(H.mapevents.Behavior.DRAGGING);
  }
});
map.addEventListener("drag", function(evt) {
  if (evt.currentPointer.type == "touch" && evt.pointers.length < 2) {
    endY = evt.currentPointer.viewportY;
    window.scrollBy(0, startY - endY);
  }
});
map.addEventListener("dragend", function(evt) {
  behavior.enable(H.mapevents.Behavior.DRAGGING);
});

/* Geocoder */
const geocoderService = platform.getGeocodingService();
const geocoder = query => {
  return new Promise((resolve, reject) => {
    geocoderService.geocode(
      {
        searchtext: query
      },
      success => {
        resolve(success.Response.View[0].Result[0].Location.DisplayPosition);
      },
      error => {
        reject(error);
      }
    );
  });
};
const reverseGeocode = coords => {
  return new Promise((resolve, reject) => {
    geocoderService.reverseGeocode(
      {
        prox: coords.Latitude + "," + coords.Longitude,
        mode: "retrieveAddresses",
        maxresults: 1
      },
      success => {
        resolve(success);
      },
      reject => {
        reject(error);
      }
    );
  });
};
const places = (query, coords, radius) => {
  return new Promise((resolve, reject) => {
    platform.getPlacesService().search(
      {
        q: query,
        in: coords.Latitude + "," + coords.Longitude + ";r=" + radius
      },
      success => {
        console.log("um sure", success.results.items);
        resolve(success.results.items);
      },
      error => {
        reject(error);
      }
    );
  });
};
const start = async () => {
  /* Silicon Beach Marker and Pin  */
  const SM = await geocoder("Santa Monica, CA");
  const CC = await geocoder("Culver city, CA");
  const PV = await geocoder("Playa Vista, CA");

  const lineString = new H.geo.LineString();
  const MiddleMarker = new H.map.Marker({ lat: 34.003655, lng: -118.433527 });

  lineString.pushPoint({ lat: 34.011586, lng: -118.492276 });
  lineString.pushPoint({ lat: 34.021625, lng: -118.3962 });
  lineString.pushPoint({ lat: 33.973986, lng: -118.430415 });
  let polygon = new H.map.Polygon(lineString);

  MiddleMarker.addEventListener(
    "tap",
    function(evt) {
      res = window.confirm(
        "Would you like to toggle the charge status of this region?"
      );
      if (res) {
        // MAKE IT SO
      }
    },
    true
  );

  map.addObjects([MiddleMarker, polygon]);
  /* Silicon Hills Marker and Pin  */
  const BH = await geocoder("Beverly Hills, CA");
  const BA = await geocoder("Bel Air, CA");
  const BR = await geocoder("Brentwood, CA, 90049");
  const BHMarker = new H.map.Marker(
    { lat: 34.073485, lng: -118.40035 },
    { visibility: false }
  );
  const BAMarker = new H.map.Marker(
    { lat: 34.083666, lng: -118.434859 },
    { visibility: false }
  );
  const BRMarker = new H.map.Marker(
    { lat: 34.066522, lng: -118.47037 },
    { visibility: false }
  );
  const lineString2 = new H.geo.LineString();
  lineString2.pushPoint(BHMarker.getGeometry());
  lineString2.pushPoint(BAMarker.getGeometry());
  lineString2.pushPoint(BRMarker.getGeometry());
  const polygon2 = new H.map.Polygon(lineString2);
  const MiddleMarker2 = new H.map.Marker({ lat: 34.077595, lng: -118.432829 });
  MiddleMarker2.addEventListener(
    "tap",
    function(evt) {
      res = window.confirm(
        "Would you like to toggle the charge status of this region?"
      );
      if (res) {
        // MAKE IT SO
      }
    },
    true
  );
  map.addObjects([MiddleMarker2, polygon2]);
  /* Silicon MidCity Marker and Pin  */
  const WHMarker = new H.map.Marker(
    { lat: 34.090396, lng: -118.373704 },
    { visibility: false }
  );
  const HWMarker = new H.map.Marker(
    { lat: 34.075937, lng: -118.376478 },
    { visibility: false }
  );
  const SLMarker = new H.map.Marker(
    { lat: 34.076221, lng: -118.361378 },
    { visibility: false }
  );
  const BoxMarker = new H.map.Marker(
    { lat: 34.090581, lng: -118.36155 },
    { visibility: false }
  );
  const lineString3 = new H.geo.LineString();
  lineString3.pushPoint(WHMarker.getGeometry());
  lineString3.pushPoint(HWMarker.getGeometry());
  lineString3.pushPoint(SLMarker.getGeometry());
  lineString3.pushPoint(BoxMarker.getGeometry());
  const polygon3 = new H.map.Polygon(lineString3);
  const MiddleMarker3 = new H.map.Marker({ lat: 34.085451, lng: -118.368036 });
  MiddleMarker3.addEventListener(
    "tap",
    function(evt) {
      res = window.confirm(
        "Would you like to toggle the charge status of this region?"
      );
      if (res) {
        // MAKE IT SO
      }
    },
    true
  );
  map.addObjects([MiddleMarker3, polygon3]);

  /* Silicon DTLA Marker and Pin  */
  const DTMarker = new H.map.Marker(
    { lat: 34.053669, lng: -118.255845 },
    { visibility: false }
  );
  const LAMarker = new H.map.Marker(
    { lat: 34.037475, lng: -118.269972 },
    { visibility: false }
  );
  const ALMarker = new H.map.Marker(
    { lat: 34.026361, lng: -118.248722 },
    { visibility: false }
  );
  const TDMarker = new H.map.Marker(
    { lat: 34.051278, lng: -118.238151 },
    { visibility: false }
  );
  const lineString4 = new H.geo.LineString();
  lineString4.pushPoint(DTMarker.getGeometry());
  lineString4.pushPoint(LAMarker.getGeometry());
  lineString4.pushPoint(ALMarker.getGeometry());
  lineString4.pushPoint(TDMarker.getGeometry());
  const polygon4 = new H.map.Polygon(lineString4);
  const MiddleMarker4 = new H.map.Marker({ lat: 34.043995, lng: -118.251414 });
  MiddleMarker4.addEventListener(
    "tap",
    function(evt) {
      res = window.confirm(
        "Would you like to toggle the charge status of this region?"
      );
      if (res) {
        // MAKE IT SO
      }
    },
    true
  );
  map.addObjects([MiddleMarker4, polygon4]);
};
start();
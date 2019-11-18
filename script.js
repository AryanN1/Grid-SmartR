// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
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
  apikey: 'fEt0rdhSaOsl-IdplRq33SxpZQDIkczd8d5MUmp1hTI'
});
// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();
// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('mapContainer'),
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
map.addEventListener('dragstart', function(evt) {
  if (evt.currentPointer.type == 'touch' && evt.pointers.length < 2) {
    startY = evt.currentPointer.viewportY;
    behavior.disable(H.mapevents.Behavior.DRAGGING);
  }
});
map.addEventListener('drag', function(evt) {
  if (evt.currentPointer.type == 'touch' && evt.pointers.length < 2) {
    endY = evt.currentPointer.viewportY;
    window.scrollBy(0, startY - endY);
  }
});
map.addEventListener('dragend', function(evt) {
  behavior.enable(H.mapevents.Behavior.DRAGGING);
});
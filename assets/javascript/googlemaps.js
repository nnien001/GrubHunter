console.log("using googlemaps.js")

var map = null; //to be initialized by initMap. this is a global.
var markerArray = []; //holds your markers

var la = { //our map center.
	name: "los angeles",
	pos: {lat: 34.060815, lng: -118.447205} //gayley building
};


function initMap(newZip) { //initialize map the first time or center map if already initialized
  
  if (map == null) { //map not yet initialized, build new map.
	 geocoder = new google.maps.Geocoder();
 	 map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: la.pos //default location so nothing breaks
	 });

  }
  else { //putting in new zip after map initialized
    console.log("clear marker here");
    markerClear();
  }

 	geocoder.geocode( { 'address': newZip}, function(results, status) { //get GPS of zip, zoom on zip.
  		if (status == 'OK') {
    		map.setCenter(results[0].geometry.location);

  		} else {
    		alert('Geocode was not successful for the following reason: ' + status);
  		}
	});



}

function addNewMarker(newPos, newLabel) {
	var marker = new google.maps.Marker({
			position: newPos,
			map: map,
			label: newLabel
	});

  markerArray.push(marker);

  marker.addListener('click', function(event) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

      var geoPos = {
        pos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      };
      
      var url = "https://www.google.com/maps/dir/"+ newPos.lat + "," + newPos.lng + "/" +geoPos.pos.lat + "," + geoPos.pos.lng; 

      location.href=url;

      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
    } 
    
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

  });

}

function setMapOnAll(map) { //typically not used other than to set to null
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(map);
  }
}

function markerClear() {
  setMapOnAll(null); //go through all marker positions, set to null
  markerArray = []; //wipe all marker references from the array
}
console.log("using googlemaps.js")

var map = null; //to be initialized by initMap. this is a global.
var markerArray = []; //holds your markers

var la = { //our map center.
	name: "los angeles",
	pos: {lat: 34.060815, lng: -118.447205} //gayley building
};

var currentPos = { //holds your coordinates for geolocation.
  pos: {
          lat: null,
          lng: null
  }  
}

function initMap(newZip) { //initialize map the first time or center map if already initialized
  
  if (map == null) { //map not yet initialized, build new map.
	  geocoder = new google.maps.Geocoder();
 	  map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 10,
		  center: la.pos, //default location so nothing breaks
      mapTypeControl: true, //moved it so it doesn't interfere with our logo
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
      }
    });

   //this listener builds map markers on click. Not sure if we need this.
    map.addListener('click', function(event) {
      console.log("map hit");

      var pos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }

      addNewMarker(pos, null);
//    console.log( "map hit", pos);
   });

  }
  else { //putting in new zip after map initialized
    console.log("clear marker here");
    markerClear();
  }

  //geocode the zip
 	geocoder.geocode( { 'address': newZip}, function(results, status) { //get GPS of zip, zoom on zip.
  		if (status == 'OK') {
    		map.setCenter(results[0].geometry.location);

  		} else {
    		alert('Geocode was not successful for the following reason: ' + status);
  		}
	});

  //get your current coordinate
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      currentPos.pos.lat = position.coords.latitude;
      currentPos.pos.lng = position.coords.longitude; 

    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } 
  
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


}

function addNewMarker(newPos, newLabel) {
	var marker = new google.maps.Marker({
			position: newPos,
			map: map,
			label: newLabel
	});

  markerArray.push(marker);

  
  marker.addListener('click', function(event) {
  
    var url = "https://www.google.com/maps/dir/" + currentPos.pos.lat + "," + currentPos.pos.lng + "/" + newPos.lat + "," + newPos.lng;
    window.open(url);
    
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
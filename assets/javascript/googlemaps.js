console.log("using googlemaps.js")

var map = null; //to be initialized by initMap. this is a global.

var la = { //our map center.
	name: "los angeles",
	pos: {lat: 34.060815, lng: -118.447205} //gayley building
};


function initMap(newZip) { //initialize map the first time or center map if already initialized
  
  if (map == null) {
	 geocoder = new google.maps.Geocoder();
 	 map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: la.pos //default location so nothing breaks
	 });

  }

 	geocoder.geocode( { 'address': newZip}, function(results, status) {
  		if (status == 'OK') {

    		map.setCenter(results[0].geometry.location);
    		var marker = new google.maps.Marker({
        	map: map,
        	position: results[0].geometry.location
    	});
  		} else {
    		alert('Geocode was not successful for the following reason: ' + status);
  		}
	});

  map.addListener('click', function(event) {
    console.log("map hit");
  });

}

function addNewMarker(newPos, newLabel) {
	var marker = new google.maps.Marker({
			position: newPos,
			map: map,
			label: newLabel
		});
    
}

/*  marker.addListener('click', function(event) {
    console.log("marker hit");
  });*/
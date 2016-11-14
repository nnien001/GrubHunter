console.log("using googlemaps.js")

var map; //to be initialized by initMap. this is a global.

var la = { //our map center.
	name: "los angeles",
	pos: {lat: 34.060815, lng: -118.447205} //gayley building
};


function initMap(newZip) {
	geocoder = new google.maps.Geocoder();
 	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: la.pos //default location so nothing breaks

	});

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



}

function addNewMarker(newPos, newLabel) {
	var marker = new google.maps.Marker({
			position: newPos,
			map: map,
			label: newLabel
		});
}

/*var geocoder;
var map;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
var address = document.getElementById('address').value;
geocoder.geocode( { 'address': address}, function(results, status) {
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
}*/
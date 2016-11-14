console.log("using googlemaps.js")

var map; //to be initialized by initMap. this is a global.

var la = { //our map center.
	name: "los angeles",
	pos: {lat: 34.060815, lng: -118.447205} //gayley building
};


function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
			center: la.pos
	});
}

function addNewMarker(newPos, newLabel) {
	var marker = new google.maps.Marker({
			position: newPos,
			map: map,
			label: newLabel
		});
}

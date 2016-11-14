console.log("using firebase.js")

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAOkQTvd4rh7eM1YQWGMdTvOF2iwBELflU",
	authDomain: "testproject1-882fe.firebaseapp.com",
	databaseURL: "https://testproject1-882fe.firebaseio.com",
	storageBucket: "testproject1-882fe.appspot.com",
	messagingSenderId: "527597865615"
};

firebase.initializeApp(config);
var database = firebase.database();

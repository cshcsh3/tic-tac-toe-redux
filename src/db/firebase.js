import * as firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAtPSuMAEBEveXAcwYSOUQJUDzJcXkycCc",
	authDomain: "tic-tac-toe-3c429.firebaseapp.com",
	databaseURL: "https://tic-tac-toe-3c429.firebaseio.com",
	projectId: "tic-tac-toe-3c429",
	storageBucket: "tic-tac-toe-3c429.appspot.com",
	messagingSenderId: "494469665190"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

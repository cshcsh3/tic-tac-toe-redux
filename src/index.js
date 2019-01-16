import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
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

firebase.initializeApp(config);

const render = () => {
	fancyLog();
	return ReactDOM.render(<App />, document.getElementById('root'));
}
render();
store.subscribe(render);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

function fancyLog() {
	console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
	console.log(store.getState());
}
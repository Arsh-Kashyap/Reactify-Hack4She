import firebase from "firebase";
import "firebase/analytics";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyCUQghORV5pTXmGcZNw85FTROEe1f_ne4k",
	authDomain: "reactify-bb006.firebaseapp.com",
	databaseURL: "https://reactify-bb006.firebaseio.com",
	projectId: "reactify-bb006",
	storageBucket: "reactify-bb006.appspot.com",
	messagingSenderId: "684243883714",
	appId: "1:684243883714:web:c1b2d387419cd21e454d5b",
	measurementId: "G-PSK129SDFD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleProvider };

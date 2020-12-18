import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCiggz1m5HH3LZJArl8Ftwd1qTCFtRq7tA",
    authDomain: "twitter-clone-8061e.firebaseapp.com",
    projectId: "twitter-clone-8061e",
    storageBucket: "twitter-clone-8061e.appspot.com",
    messagingSenderId: "312479907616",
    appId: "1:312479907616:web:ef4369ab5a15b1276c2145"
};

 firebase.initializeApp(firebaseConfig);
 const authService = firebase.auth();

 export const firebaseinstance = firebase;

 export default authService;

 export const dbService = firebase.firestore();
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVRK9gSbOdQns--Y9Ab-8M_hC1qwHC8SM",
    authDomain: "letsgo-95b2b.firebaseapp.com",
    projectId: "letsgo-95b2b",
    storageBucket: "letsgo-95b2b.appspot.com",
    messagingSenderId: "392515570161",
    appId: "1:392515570161:web:7643b893fe652dec435c50",
    measurementId: "G-VWZ0VWHH9B"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };


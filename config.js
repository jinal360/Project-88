import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDrp7a1GhandjGUPll1z4TvNzraCi7l_PE",
  authDomain: "barter-system-app-32912.firebaseapp.com",
  projectId: "barter-system-app-32912",
  storageBucket: "barter-system-app-32912.appspot.com",
  messagingSenderId: "1893372643",
  appId: "1:1893372643:web:78e0e144d394077396ebd6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
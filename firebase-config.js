// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyATXdsB_HxP3xY60qsZ6kAydC9zdQGDTaU",
  authDomain: "encyclopedialphabet.firebaseapp.com",
  projectId: "encyclopedialphabet",
  storageBucket: "encyclopedialphabet.appspot.com",
  messagingSenderId: "225712774247",
  appId: "1:225712774247:android:a5c82fbbcd341b137c08c2"
};

// تهيئة Firestore
const db = firebase.firestore();
// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

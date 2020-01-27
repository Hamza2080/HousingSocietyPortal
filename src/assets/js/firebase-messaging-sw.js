importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyAKkE9_UUPkF8D4kviFGsLAmiXH95OkLYU",
   authDomain: "homecare-3d067.firebaseapp.com",
   databaseURL: "https://homecare-3d067.firebaseio.com",
   projectId: "homecare-3d067",
   storageBucket: "homecare-3d067.appspot.com",
   messagingSenderId: "1015404328205",
   appId: "1:1015404328205:web:110c490d7734ee92272c44",
   measurementId: "G-5M2M1DQ6BP"
});

const messaging = firebase.messaging();
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC_F3UR_cEzz1d0xjSoJU7MDouXO6eZ7WA",
  authDomain: "lajunta-igsofware.firebaseapp.com",
  projectId: "lajunta-igsofware",
  storageBucket: "lajunta-igsofware.firebasestorage.app",
  messagingSenderId: "987868676574",
  appId: "1:987868676574:web:1d2b556789f7c7e18c9d4f"
});

const messaging = firebase.messaging();

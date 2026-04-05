// ================================================
// FIREBASE INITIALIZATION
// ================================================
// Firebase is loaded via CDN in HTML
// This file initializes Firebase after the SDK loads

// Wait for Firebase to be available from CDN
document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK not loaded. Make sure Firebase scripts are included in HTML.');
        return;
    }

    // Initialize Firebase with your config
    const firebaseConfig = {
        apiKey: "AIzaSyDCqpIC-YMWMNP_Bjdfhb5lmJDde0dBbqk",
        authDomain: "movie-website-24502.firebaseapp.com",
        projectId: "movie-website-24502",
        storageBucket: "movie-website-24502.firebasestorage.app",
        messagingSenderId: "786613840105",
        appId: "1:786613840105:web:1e484884495d2deeb32878",
        measurementId: "G-4MLBG7YKJJ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize services you need
    const auth = firebase.auth();
    const db = firebase.firestore();
    const analytics = firebase.analytics();

    // Make available globally if needed
    window.firebaseApp = {
        auth: auth,
        db: db,
        analytics: analytics,
        firebase: firebase
    };

    console.log('Firebase initialized successfully!');
});

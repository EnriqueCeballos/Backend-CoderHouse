var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvjjkKhMWYFSgkOuU9zOgFIX0FxM4CvOk",
  authDomain: "fir-backend-91191.firebaseapp.com",
  projectId: "fir-backend-91191",
  storageBucket: "fir-backend-91191.appspot.com",
  messagingSenderId: "907985600391",
  appId: "1:907985600391:web:2b89d97bea5f520a649d22",
  measurementId: "G-J5PDM54C9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

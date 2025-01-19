/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCImUrnDBt_VRYUP8b0ssvTeYJPsB0lVXs",
  authDomain: "api-pokemon-c4419.firebaseapp.com",
  projectId: "api-pokemon-c4419",
  storageBucket: "api-pokemon-c4419.firebasestorage.app",
  messagingSenderId: "480601322972",
  appId: "1:480601322972:web:8248a3d01e11d974c18b19",
  measurementId: "G-PXV1MDS85T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
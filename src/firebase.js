// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDISgwsvzwrFDXAABhAxaFqkWel-LhiwJo",
  authDomain: "nix-larva.firebaseapp.com",
  projectId: "nix-larva",
  storageBucket: "nix-larva.appspot.com",
  messagingSenderId: "677622573893",
  appId: "1:677622573893:web:0011fa9c95aa63b2232c2c",
  measurementId: "G-T774VFN7CN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

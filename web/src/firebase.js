// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvB6JncsHauyiRCpO-YVb2Jj4qExuqcMo",
  authDomain: "mern-auth-75aa5.firebaseapp.com",
  projectId: "mern-auth-75aa5",
  storageBucket: "mern-auth-75aa5.appspot.com",
  messagingSenderId: "986152428352",
  appId: "1:986152428352:web:e60b3139804e627f0b10a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjNzu15k-qbn_anKXJIkjgwuwWVJYkj4o",
  authDomain: "twitter-clone-ec3ca.firebaseapp.com",
  projectId: "twitter-clone-ec3ca",
  storageBucket: "twitter-clone-ec3ca.appspot.com",
  messagingSenderId: "1021191677872",
  appId: "1:1021191677872:web:fb6bb4400ab49f1dbe1875"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
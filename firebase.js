// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"

import {getFirestore} from "firebase/firestore"

import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdIzBmrdgORlAVkSUu1OEUj82qnV2OSEE",
  authDomain: "twiddur-c4e97.firebaseapp.com",
  projectId: "twiddur-c4e97",
  storageBucket: "twiddur-c4e97.appspot.com",
  messagingSenderId: "1018301474648",
  appId: "1:1018301474648:web:3e728c126079430d1da72d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage()
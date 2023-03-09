// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider}from"firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo_tbr6AT3M2--TYDBgOPFlFyjuKOvFzk",
  authDomain: "whatsappclone-52bbd.firebaseapp.com",
  projectId: "whatsappclone-52bbd",
  storageBucket: "whatsappclone-52bbd.appspot.com",
  messagingSenderId: "547551505137",
  appId: "1:547551505137:web:2a6be377a611aef18f5750"
};

// Initialize Firebase

const app =initializeApp(firebaseConfig);

const auth=getAuth();
const provider= new GoogleAuthProvider();

export {app,auth,provider};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkiUynUA82675hqgCM9OXbbN-dr85xqzI",
  authDomain: "d-models-hub-6f0ca.firebaseapp.com",
  projectId: "d-models-hub-6f0ca",
  storageBucket: "d-models-hub-6f0ca.firebasestorage.app",
  messagingSenderId: "486474137754",
  appId: "1:486474137754:web:3a7274b942cacf55509f23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
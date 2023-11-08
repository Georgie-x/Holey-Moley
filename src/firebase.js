// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaQMGBLTwtTHkOcXnhPvxA9QZzb-cwy-E",
  authDomain: "holey-moley-6f565.firebaseapp.com",
  projectId: "holey-moley-6f565",
  storageBucket: "holey-moley-6f565.appspot.com",
  messagingSenderId: "1000443795879",
  appId: "1:1000443795879:web:faf6fe3cc9548195423e82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

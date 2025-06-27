import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARTLk8lhB5-XccDduF8d7y9efoIBvhJg8",
  authDomain: "mangobyte-assets.firebaseapp.com",
  projectId: "mangobyte-assets",
  storageBucket: "mangobyte-assets.firebasestorage.app",
  messagingSenderId: "1003955692815",
  appId: "1:1003955692815:web:39b6dcf7548a68bf9c0a7a",
  measurementId: "G-3V630BC9Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const logOut = () => {
  return signOut(auth);
};

export { auth, signInWithGoogle, logOut };

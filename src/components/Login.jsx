import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle, logOut } from "../firebase";
import "./Login.css";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (user) {
    return (
      <div className="login-container">
        <p>Welcome, {user.displayName}</p>
        <button className="login-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <button className="login-button" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;

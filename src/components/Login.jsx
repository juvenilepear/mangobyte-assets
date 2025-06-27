import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle, logOut } from "../firebase";
import allowedUsers from "../allowedUsers.json";
import "./Login.css";

function Login() {
  const [user, setUser] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const emailAllowed = allowedUsers.allowedEmails.includes(currentUser.email);
        if (!emailAllowed) {
          await logOut();
          setAccessDenied(true);
          setUser(null);
        } else {
          setAccessDenied(false);
          setUser(currentUser);
        }
      } else {
        setUser(null);
        setAccessDenied(false);
      }
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

  if (accessDenied) {
    return (
      <div className="login-container">
        <p>Access Denied. Your account is not authorized to log in.</p>
      </div>
    );
  }

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

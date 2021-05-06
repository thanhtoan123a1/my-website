import React, { useContext, useEffect, useState } from "react";
import { auth } from "redux/helpers/firebase";
import firebase from 'firebase/app';

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {

  const [ currentUser, setCurrentUser ] = useState();
  const [ loading, setLoading ] = useState(true);
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  async function logout() {
    return await auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function loginFacebook() {
    const facebookAuth = new firebase.auth.FacebookAuthProvider();
    return auth.signInWithPopup(facebookAuth);
  }
  function loginGoogle() {
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(googleAuth);
  }

  function updateProfile(body) {
    return currentUser.updateProfile(body);
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    loginFacebook,
    loginGoogle,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 
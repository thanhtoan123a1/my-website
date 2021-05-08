import React, { useContext, useEffect, useState } from "react";
import { auth } from "redux/helpers/firebase";
import firebase from "firebase/app";
import { firestore } from "redux/helpers/firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signup(email, password, userName) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (cred) => {
        await firestore
          .collection("users")
          .doc(cred.user.uid)
          .set({
            displayName: userName,
            phoneNumber: cred.user.phoneNumber || "",
            email: cred.user.email,
            uid: cred.user.uid,
            photoURL:
              cred.user.photoURL ||
              "https://my-website-web.vercel.app/static/media/user.de2ba6b9.png",
            coverImageURL: "",
          });
        await cred.user.updateProfile({
          displayName: userName,
          photoURL:
            cred.user.photoURL ||
            "https://my-website-web.vercel.app/static/media/user.de2ba6b9.png",
        });
        return;
      });
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
    return auth.signInWithPopup(googleAuth).then(async (user) => {
      if (user.additionalUserInfo.isNewUser) {
        const newUser = user.user;
        await firestore
          .collection("users")
          .doc(newUser.uid)
          .set({
            displayName: newUser.displayName,
            phoneNumber: newUser.phoneNumber || "",
            email: newUser.email,
            uid: newUser.uid,
            photoURL: newUser.photoURL,
            coverImageURL: "",
          });
        return;
      }
    });
  }

  function updateProfile(body) {
    return currentUser.updateProfile(body);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

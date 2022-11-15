import React, { createContext } from "react";
import app from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

// export AuthContex = createContext
export const AuthContex = createContext();
const GobalAuthProvaider = ({ children }) => {
  const [user, setUser] = useState({});

  const auth = getAuth(app);
  // create user function
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUser = (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // user log Out function
  const logOut = () => {
    return signOut(auth)
      .then(() => {
        // user sign out
        setUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // user sign in function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.uid) {
        setUser(currentUser);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = { createUser, updateUser, user, logOut, login };
  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default GobalAuthProvaider;

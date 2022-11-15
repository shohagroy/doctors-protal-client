import React, { createContext } from "react";
import app from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// export AuthContex = createContext
export const AuthContex = createContext();
const GobalAuthProvaider = ({ children }) => {
  const auth = getAuth(app);
  // create user function
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const user = { name: "Shohag" };
  const authInfo = { createUser };
  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default GobalAuthProvaider;

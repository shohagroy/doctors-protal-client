import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContex);

  const location = useLocation();

  if (loader) {
    return (
      <div>
        <h2>Loding...</h2>
      </div>
    );
  }

  if (!user.email) {
    return <Navigate to="/login" state={{ path: location }} replace></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;

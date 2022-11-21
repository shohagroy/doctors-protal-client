import React, { useContext } from "react";
import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";
import useAdmin from "../Shared/UseAdmin/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContex);
  const [isAdmin, loading] = useAdmin(user?.email);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isAdmin) {
    return children;
  } else logOut();
};

export default AdminRoute;

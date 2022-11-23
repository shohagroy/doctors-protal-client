import React, { useContext } from "react";
import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../Shared/Loader/LoadingLoader";
import useAdmin from "../Shared/UseAdmin/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContex);
  const [isAdmin, loading] = useAdmin(user?.email);

  if (loading) {
    return <LoadingLoader />;
  }

  if (isAdmin) {
    return children;
  } else logOut();
};

export default AdminRoute;

import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";
import useAdmin from "../../Shared/UseAdmin/useAdmin";

const Dashbord = () => {
  const { user } = useContext(AuthContex);

  const [isAdmin] = useAdmin(user.email);

  return (
    <div className="max-w-7xl mx-auto flex  h-[50%]">
      <div className="w-[250px] mx-3  ">
        <h3 className="text-3xl font-semibold">User Dashbord</h3>
        <div className="mt-3">
          <Link to="../dashbord/appointment">
            <button className="btn btn-sm w-full my-2">My Appointment</button>
          </Link>

          {isAdmin && (
            <>
              <Link to="../dashbord/manage-user">
                <button className="btn btn-sm w-full my-2">All User</button>
              </Link>
              <Link to="../dashbord/add-doctor">
                <button className="btn btn-sm w-full my-2">Add a Doctor</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashbord;

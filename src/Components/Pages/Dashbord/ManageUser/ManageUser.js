import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingButton from "../../../Shared/Loader/LoadingButton";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

const ManageUser = () => {
  const { user, logOut } = useContext(AuthContex);
  const [removeButtonLoading, setRemoveButtonLoading] = useState(false);
  const [makeButtonLoading, setMakeButtonLoading] = useState(false);
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.massege === "unauthorized access") {
        logOut();
      } else {
        return data;
      }
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  const makeAdminHandelar = (id) => {
    setMakeButtonLoading(true);
    fetch(`http://localhost:5000/makeAdmin?email=${user.email}&id=${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.massege === "unauthorized access") {
          logOut();
        }
        setMakeButtonLoading(false);
        refetch();
      });
  };

  const removeAdminHandelar = (id) => {
    setRemoveButtonLoading(true);
    fetch(`http://localhost:5000/removeAdmin?email=${user.email}&id=${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.massege === "unauthorized access") {
          logOut();
        }
        setRemoveButtonLoading(false);
        refetch();
      });
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-3xl">Total Users - {users.length} </h3>
      </div>
      <div className="overflow-x-auto my-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div onClick={() => makeAdminHandelar(user._id)}>
                    <LoadingButton
                      loading={makeButtonLoading}
                      color="bg-green-600"
                      font="text-white"
                      disable={user.role === "admin"}
                      text="make admin"
                    />
                  </div>
                </td>
                <td>
                  <div onClick={() => removeAdminHandelar(user._id)}>
                    <LoadingButton
                      loading={removeButtonLoading}
                      color="bg-red-600"
                      font="text-white"
                      disable={user.role !== "admin"}
                      className="bg-red-600"
                      text="remove admin"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;

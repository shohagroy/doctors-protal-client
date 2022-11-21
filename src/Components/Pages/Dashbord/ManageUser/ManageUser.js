import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";

const ManageUser = () => {
  const { user, logOut } = useContext(AuthContex);
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
    return <h2>Loading...</h2>;
  }

  const makeAdminHandelar = (id) => {
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
        refetch();
      });
  };

  const removeAdminHandelar = (id) => {
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
                  <button
                    onClick={() => makeAdminHandelar(user._id)}
                    disabled={user.role === "admin"}
                    className="btn btn-sm bg-green-500 text-white"
                  >
                    Admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeAdminHandelar(user._id)}
                    disabled={user.role !== "admin"}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Remove
                  </button>
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

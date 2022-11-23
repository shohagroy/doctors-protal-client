import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import swal from "sweetalert";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

const ManageDoctors = () => {
  const { user, logOut } = useContext(AuthContex);

  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors", "removeDoctorHandelar", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/doctors?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    <LoadingLoader />;
  }

  const removeDoctorHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete This Doctor!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/doctors?email=${user.email}&id=${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              swal("Done! Doctor has been deleted!", {
                icon: "success",
              });
              refetch();
            }
          });
      } else {
        swal("Cancel! Doctor is safe!");
      }
    });
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-3xl">Total Users - {doctors.length}</h3>
      </div>
      <div className="overflow-x-auto my-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialist</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.img} alt={doctor.name} />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor?.specialist}</td>
                <td>
                  <button
                    onClick={() => removeDoctorHandelar(doctor._id)}
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

export default ManageDoctors;

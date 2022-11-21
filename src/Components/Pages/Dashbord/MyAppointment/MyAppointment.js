import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import swal from "sweetalert";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";

const MyAppointment = () => {
  const { user, logOut } = useContext(AuthContex);

  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointment", "deletedAppointment"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/booking?email=${user.email}`,
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

  const deletedAppointment = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Appointment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/booking/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              swal("Appointment Delete Successfull!", {
                icon: "success",
              });
              refetch();
            }
          });
      } else {
        swal("Your Appointment is safe!");
      }
    });
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-3xl">My appointment - {appointments.length}</h3>
      </div>
      <div className="overflow-x-auto my-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Treatment Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Paynemt</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{appointment.tretmentName}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>
                  <button className="btn btn-sm bg-green-500 text-white">
                    Pay
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deletedAppointment(appointment._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Deleted
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

export default MyAppointment;

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";

const AvailableAppointments = ({ selected }) => {
  const date = format(selected, "PP");

  const { user, logOut } = useContext(AuthContex);
  const [selectedDate, setSelectedDate] = useState({});
  const { name, slots, price } = selectedDate;

  const {
    data: appointmentOptions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/appointments?email=${user.email}&date=${date}`,
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

  // submit appointment function
  const submitAppointmentDate = (event) => {
    event.preventDefault();
    const from = event.target;

    const patientDetail = {
      tretmentName: name,
      appointmentDate: from.appointmentDate.value,
      appointmentTime: from.appointmentTime.value,
      patientName: from.patientName.value,
      email: from.email.value,
      phone: from.phone.value,
      price: price,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(patientDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(`Booking Confirm on date ${date}!`);
          refetch();
          from.reset();
        }
      });
  };

  return (
    <section className="max-w-7xl mx-auto relative">
      <div className={`${isLoading ? "absolute" : "hidden"} top-0 left-1/2`}>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
      </div>
      <div className="my-6">
        <h3 className="text-center text-xl text-secondary font-bold">
          Available Appointments on {date}
        </h3>
        <div className="grid grid-cols-1 my-16 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* appointment map  */}
          {appointmentOptions?.map((option) => (
            <div key={option._id} className="card shadow-xl">
              <div className="card-body">
                <h2 className="text-secondary text-center text-xl font-bold">
                  {option.name}
                </h2>
                <p className="text-center p-3">
                  {option.slots.length > 0
                    ? option.slots[0]
                    : "Try Another day"}
                </p>
                <p className="text-center">
                  <span className="mr-2 font-bold text-red-600">
                    {option.slots.length}
                  </span>
                  {option.slots.length > 0 ? "SPACES" : "SPACE"} AVAILABLE
                </p>
                <p className="text-center font-semibold text-red-600">
                  <small>${option.price}</small>
                </p>
                <div className="card-actions  justify-center ">
                  <label
                    className="btn bg-gradient-to-r from-primary text-white border-none to-secondary"
                    disabled={!option.slots.length}
                    htmlFor="book-appointment"
                    onClick={() => setSelectedDate(option)}
                  >
                    Book Appointment
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* modal */}
        <input type="checkbox" id="book-appointment" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="book-appointment"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form onSubmit={submitAppointmentDate}>
              <h3 name="tretment" className="text-lg font-bold">
                {name}
              </h3>
              <p className="mt-2 font-bold text-red-600">${price} Only!</p>

              <input
                type="text"
                name="appointmentDate"
                disabled
                value={date}
                className="input input-bordered w-full mt-4  "
              />
              <select
                className="input input-bordered w-full mt-4  "
                name="appointmentTime"
              >
                {slots &&
                  slots.map((time, i) => (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                placeholder="Patient Name"
                name="patientName"
                defaultValue={user?.displayName}
                disabled
                className="input input-bordered w-full my-2  "
              />
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full my-2  "
              />
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                className="input input-bordered w-full my-2  "
              />
              <div className="modal-action" type="submit">
                <button type="submit">
                  <label
                    className="btn btn-primary w-full text-white"
                    htmlFor="book-appointment"
                  >
                    Book Now
                  </label>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableAppointments;

import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AvailableAppointments = ({ selected }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const { name, slots } = selectedDate;

  console.log(name, slots);

  useEffect(() => {
    fetch("appointmentOptions.json").then((res) =>
      res.json().then((data) => setAppointmentOptions(data))
    );
  }, []);

  const date = format;
  return (
    <section className="max-w-7xl mx-auto">
      <div className="my-6">
        <h3 className="text-center text-xl text-secondary font-bold">
          Available Appointments on {date(selected, "PP")}
        </h3>
        <div className="grid grid-cols-1 my-16 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointmentOptions.map((option) => (
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
                <div className="card-actions  justify-center ">
                  <label
                    className="btn bg-gradient-to-r from-primary text-white border-none to-secondary"
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
            <h3 className="text-lg font-bold">{name}</h3>
            <form>
              <input
                type="text"
                disabled
                value={date(selected, "PP")}
                className="input input-bordered w-full mt-4  "
              />
              <select className="input input-bordered w-full mt-4  ">
                {slots.map((time, i) => (
                  <option key={i}>{time}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Patient Name"
                className="input input-bordered w-full my-2  "
              />
              <input
                type="text"
                placeholder="Email Address"
                className="input input-bordered w-full my-2  "
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full my-2  "
              />
            </form>

            <div className="modal-action">
              <label htmlFor="book-appointment" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableAppointments;

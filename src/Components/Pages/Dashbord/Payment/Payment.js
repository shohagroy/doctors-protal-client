import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import ChekoutFrom from "./ChekoutFrom";

const stripePromise = loadStripe(process.env.REACT_APP_strip_pk);

const Payment = () => {
  const myAppointment = useLoaderData();

  const {
    appointmentDate,
    appointmentTime,
    email,
    patientName,
    price,
    tretmentName,
  } = myAppointment;

  return (
    <div className="w-full">
      <h3 className=" text-red-400 text-xl  font-bold">
        Payment for <strong className="text-secondary">{tretmentName}</strong>
      </h3>
      <div className="mt-4">
        <div>
          <h2>
            Appointment on <strong>{appointmentDate}</strong> Time:{" "}
            <strong>{appointmentTime}</strong>, Price:{" "}
            <strong className="text-red-600">${price}</strong>
          </h2>
        </div>
        <h2 className="py-4 text-2xl">
          Patient Name: <strong>{patientName}</strong>
        </h2>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <ChekoutFrom booking={myAppointment}></ChekoutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

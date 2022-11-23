import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

const Transactions = () => {
  const { user } = useContext(AuthContex);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/transactions?email=${user?.email}`,
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

  console.log(transactions);

  if (isLoading) {
    return <LoadingLoader />;
  }
  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl">
          Account Transactions - {transactions.length}
        </h3>
        <p className="text-xl font-semibold py-2 px-4 border rounded-md">
          {new Date().toDateString().slice(4)}
        </p>
      </div>
      <div className="overflow-x-auto my-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Booking ID</th>
              <th>Transaction ID</th>
              <th>Download Slip</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((payment, i) => (
              <tr key={i}>
                <th> {i + 1}</th>
                <td>{payment.patientName}</td>
                <td>{payment.email}</td>
                <td>${payment.price}</td>
                <td>${payment.bookingId}</td>
                <td className="text-red-600 font-bold">
                  {payment.transactionId.slice(3)}
                </td>
                <td>
                  <button className="btn btn-sm bg-primary text-white">
                    Download
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

export default Transactions;

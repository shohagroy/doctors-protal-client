import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";
const imgbbHostKey = process.env.REACT_APP_imgbb_key;

const AddDoctor = () => {
  const { user } = useContext(AuthContex);
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: tretmentsName, isLoading } = useQuery({
    queryKey: ["tretmentsName"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/specialist?email=${user.email}`,
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

  const addDoctorHandaler = (data) => {
    setLoading(true);
    const fromData = new FormData();
    const drImg = data.images[0];
    fromData.append("image", drImg);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          toast.success(`Dr. ${data.name} Image Update!`);
          const imgUrl = imgData.data.url;
          const email = data.email;
          const name = data.name;
          const specialist = data.specialist;

          const doctorData = { name, email, img: imgUrl, specialist };

          fetch(`http://localhost:5000/doctors?email=${user.email}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(doctorData),
          })
            .then((res) => res.json())
            .then((confarmation) => {
              if (confarmation.acknowledged) {
                toast.success(`${data.name} Dr. Added Successfully!`);
                setLoading(false);
                navigation("../manage-doctors");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <LoadingLoader />;
  }
  return (
    <section className="mx-auto mt-10">
      <div className="w-[350px]">
        <h3 className="text-2xl font-semibold">Add Doctor From</h3>
        <form onSubmit={handleSubmit(addDoctorHandaler)} className="my-10">
          <div className="mt-3">
            <label className="block">Doctor Name</label>
            <input
              required
              {...register("name")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Dr. Name"
            />
          </div>
          <div className="mt-3">
            <label className="block">Doctor Email</label>
            <input
              required
              {...register("email")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Dr. Email"
            />
          </div>
          <div className="mt-5">
            <label className="block">Doctor Specialist</label>
            <select
              {...register("specialist")}
              className="input input-bordered w-full"
            >
              {tretmentsName.map((tretment) => (
                <option key={tretment._id} value={tretment?.name}>
                  {tretment?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label className="block">Doctor Images</label>
            <input
              {...register("images")}
              type="file"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className={`btn btn-outline cursor-pointer w-full ${
                loading && "loading"
              }`}
            >
              {loading ? "Loading..." : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddDoctor;

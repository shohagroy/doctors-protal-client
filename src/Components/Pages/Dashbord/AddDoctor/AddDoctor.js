import React from "react";
import { useForm } from "react-hook-form";

const AddDoctor = () => {
  const { register, handleSubmit } = useForm();
  const addDoctorHandaler = (data) => {
    console.log(data);
  };
  return (
    <section className="mx-auto mt-10">
      <div className="w-[350px]">
        <h3 className="text-2xl font-semibold">Add Doctor From</h3>
        <form onSubmit={handleSubmit(addDoctorHandaler)} className="mt-10">
          <div className="mt-3">
            <label className="block">Doctor Name</label>
            <input
              {...register("name")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Dr. Name"
            />
          </div>
          <div className="mt-5">
            <label className="block">Doctor Specialist</label>
            <select
              {...register("specialist")}
              className="input input-bordered w-full"
              name=""
            >
              <option value="abc">abc</option>
              <option value="abc">def</option>
            </select>
            {/* <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Dr. Specialist"
            /> */}
          </div>
          <div className="mt-5">
            <label className="block">Doctor Images</label>
            <input type="file" className="input input-bordered w-full" />
          </div>
          <div className="mt-5">
            <input
              type="submit"
              value="Add Doctor"
              className="btn btn-outline cursor-pointer w-full"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddDoctor;

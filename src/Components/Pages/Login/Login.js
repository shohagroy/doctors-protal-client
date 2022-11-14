import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handelLogin = (data) => {
    console.log(data);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="h-[70vh] flex  justify-center items-center">
        <div className=" w-96 shadow shadow-lg flex flex-col justify-center items-center p-6  rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Login</h3>
          <form onSubmit={handleSubmit(handelLogin)} className="w-full">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Forgot Password ?</span>
              </label>
            </div>
            <div className="mt-4">
              <input
                type="submit"
                value="Login"
                className="input btn bg-accent input-bordered w-full"
              />
            </div>
            <div>
              <p className="label-text text-center mt-2">
                New to Doctors Portal?
                <span className="text-secondary pl-2 font-bold">
                  Create new account
                </span>
              </p>
            </div>
          </form>
          <div className="divider my-4">OR</div>
          <button className="btn btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContex);
  const [saveUser, setSaveUser] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.state?.path?.pathname || "/";

  if (saveUser) {
    navigate(path, { location: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelSignUp = (data) => {
    setAuthError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUser(data.name)
          .then(() => {
            // update user name

            const newUser = { name: user.displayName, email: user.email };
            databaseUser(newUser);

            const userEmail = { email: user.email };
            if (userEmail) {
              fetch(`http://localhost:5000/jwt`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userEmail),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.jwtToken) {
                    localStorage.setItem("token", data.jwtToken);
                    navigate(path, { relative: true });
                  }
                });
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        setAuthError(err.code.slice(5));
        console.error(err);
      });
  };

  const databaseUser = (user) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setSaveUser(true);
        }
      });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="h-[70vh] flex  justify-center items-center">
        <div className=" w-96 shadow shadow-lg flex flex-col justify-center items-center p-6  rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Sign Up</h3>
          <form onSubmit={handleSubmit(handelSignUp)} className="w-full">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Please Enter Your Name!" })}
                className={`input input-bordered w-full ${
                  errors.name && "border-red-600"
                }`}
              />
              {errors.name && (
                <p className="text-red-600"> {errors.name?.message} </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Please Enter Vaild Email!",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format!",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.email && "border-red-600"
                }`}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Please Enter a Password!",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message:
                      "Password must have uppercase, number and special characters",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.password && "border-red-600"
                }`}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            <div>
              <p className="text-center mt-5 font-bold text-red-600">
                {authError}
              </p>
            </div>
            <div className="mt-4">
              <input
                type="submit"
                value="Sign Up"
                className="input btn bg-accent input-bordered w-full"
              />
            </div>
            <div>
              <p className="label-text text-center mt-2">
                Already have an Account?
                <Link to="../login" className="text-secondary pl-2 font-bold">
                  Login
                </Link>
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

export default SignUp;

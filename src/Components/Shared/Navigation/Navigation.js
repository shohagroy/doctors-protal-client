import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";

const Navigation = () => {
  const { user, logOut } = useContext(AuthContex);
  const [themes, setThemes] = useState(false);

  const customesThemes = (condition) => {
    setThemes(condition);
  };

  const menu = (
    <>
      <NavLink to="/" className="p-2">
        Home
      </NavLink>
      <NavLink to="/" className="p-2">
        About
      </NavLink>
      <NavLink to="/appointment" className="p-2">
        Appointment
      </NavLink>
      <NavLink to="/" className="p-2">
        Reviews
      </NavLink>
      <NavLink to="/dashbord" className={`p-2 ${!user.email && "hidden"}`}>
        Dashbord
      </NavLink>
      <NavLink to="/" className="p-2">
        Contact Us
      </NavLink>
      {!user.email ? (
        <NavLink to="/login" className="p-2">
          Login
        </NavLink>
      ) : (
        <button onClick={logOut} className="p-2 hover:text-red-600 ">
          Log Out
        </button>
      )}
    </>
  );
  return (
    <section className="max-w-7xl mx-auto">
      <div className="navbar  justify-between">
        <div className="navbar-start ">
          <a className="btn btn-ghost normal-case text-xl">Doctors Portal</a>
        </div>
        <div className="navbar-center hidden bg-white lg:flex">
          <ul className="menu menu-horizontal bg-white z-50 p-0">{menu}</ul>

          <div className="ml-10">
            {themes ? (
              <span
                onClick={() => customesThemes(!themes)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </span>
            ) : (
              <span
                onClick={() => customesThemes(!themes)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact w-32 dropdown-content mt-3 p-2 shadow rounded-box -ml-20"
          >
            {menu}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navigation;

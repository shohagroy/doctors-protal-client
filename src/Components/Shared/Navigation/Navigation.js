import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const menu = (
    <>
      <NavLink to="/" className="p-2">
        Home
      </NavLink>
      <NavLink to="/" className="p-2">
        About
      </NavLink>
      <NavLink to="/" className="p-2">
        Appointment
      </NavLink>
      <NavLink to="/" className="p-2">
        Reviews
      </NavLink>
      <NavLink to="/" className="p-2">
        Contact Us
      </NavLink>
      <NavLink to="/" className="p-2">
        Login
      </NavLink>
    </>
  );
  return (
    <section className="max-w-7xl mx-auto">
      <div className="navbar  justify-between">
        <div className="navbar-start ">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menu}</ul>
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

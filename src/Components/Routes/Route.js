import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Appointment from "../Pages/Appointment/Appointment";
import AddDoctor from "../Pages/Dashbord/AddDoctor/AddDoctor";
import Dashbord from "../Pages/Dashbord/Dashbord";
import ManageUser from "../Pages/Dashbord/ManageUser/ManageUser";
import MyAppointment from "../Pages/Dashbord/MyAppointment/MyAppointment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            <Appointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
        children: [
          {
            path: "/dashbord",
            element: (
              <PrivateRoute>
                <MyAppointment />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashbord/appointment",
            element: (
              <PrivateRoute>
                <MyAppointment />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashbord/manage-user",
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <ManageUser />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashbord/add-doctor",
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AddDoctor />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;

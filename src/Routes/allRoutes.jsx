import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import DashboardEcommerce from "../pages/Dashboard";
import Roles from "../pages/Roles";
import SchoolDashboard from "../pages/SchoolDashboard";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/roles", component: <Roles /> },
  { path: "/school", component: <SchoolDashboard /> },
];

const publicRoutes = [
  { path: "/", Component: <Login /> },
  { path: "/forgot-password", Component: <ForgetPassword /> },
];

export { publicRoutes, authProtectedRoutes };

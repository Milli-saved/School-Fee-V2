import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import DashboardEcommerce from "../pages/Dashboard";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
];

const publicRoutes = [
  { path: "/", Component: <Login /> },
  { path: "/forgot-password", Component: <ForgetPassword /> },
];

export { publicRoutes, authProtectedRoutes };

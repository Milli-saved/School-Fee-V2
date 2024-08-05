import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { createSelector } from "reselect";
import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import DashboardEcommerce from "../pages/Dashboard";
import Roles from "../pages/Roles";
import SchoolDashboard from "../pages/SchoolDashboard";
import StudentsBoard from "../pages/Students";
import StudentsList from "../pages/Students/StudentsList";
import StudentDetails from "../pages/Students/StudentDetails";
import UpdatePassword from "../pages/PasswordUpdateModal";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/roles", component: <Roles /> },
  { path: "/school", component: <SchoolDashboard /> },
  { path: "/students", component: <StudentsBoard /> },
  { path: "/student-list/:id", component: <StudentsList /> },
  { path: "/student-detail", component: <StudentDetails /> },
  { path: "/update-password", component: <UpdatePassword /> },
];

const publicRoutes = [
  { path: "/", Component: <Login /> },
  { path: "/forgot-password", Component: <ForgetPassword /> },
];

export { publicRoutes, authProtectedRoutes };

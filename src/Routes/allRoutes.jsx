import React from "react";
import { Navigate } from "react-router-dom";

import BasicSignIn from "../pages/AuthenticationInner/Login/Signin";
import Login from "../pages/Authentication/Login";

const publicRoutes = [{ path: "/", Component: <Login /> }];

export { publicRoutes };

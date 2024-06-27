import React from "react";
import { Navigate } from "react-router-dom";

import BasicSignIn from "../pages/AuthenticationInner/Login/Signin";

const publicRoutes = [{ path: "/login", Component: <BasicSignIn /> }];

export { publicRoutes };

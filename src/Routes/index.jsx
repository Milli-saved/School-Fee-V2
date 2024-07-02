import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import { AuthProtected } from "./authProtected";

// Routes
import { publicRoutes, authProtectedRoutes } from "./allRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.Component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              }
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
